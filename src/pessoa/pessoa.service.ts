import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';
import { PessoaDtoRequest } from 'src/dto/Pessoa.DtoRequest';
import { PessoaDtoResponse } from 'src/dto/Pessoa.DtoResponse';
import { plainToInstance } from 'class-transformer';
import { hash } from 'bcrypt';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa) private pessoaRepository: typeof Pessoa
  ) { }

  async listarTodos(): Promise<PessoaDtoResponse[]> {
    return this.pessoaRepository.findAll()
  }

  async listarPorId(id: number): Promise<PessoaDtoResponse> {
    this.validarSePessoaExiste(id)
    return this.pessoaRepository.findOne({ where: { id } })
  }

  async buscarPessoaPorEmail(email: string): Promise<PessoaDtoRequest> {
    return this.pessoaRepository.findOne({ where: { email } })
  }

  async buscarPessoaPorCpf(cpf: string): Promise<PessoaDtoRequest> {
    return this.pessoaRepository.findOne({ where: { cpf } })
  }



  async cadastrar(pessoa: PessoaDtoRequest): Promise<PessoaDtoResponse> {
    await this.validarSeCPFExiste(pessoa.cpf)
    return await this.pessoaRepository.create({
      nome: pessoa.nome,
      telefone: pessoa.telefone,
      cpf: pessoa.cpf,
      email: pessoa.email,
      senha: await hash(pessoa.senha, 10)
    })
  }

  async editar(id: number, pessoa: PessoaDtoRequest): Promise<any> {

    const pessoaEditada = await this.validarSePessoaExiste(id)

    Object.assign(pessoaEditada, {
      telefone: pessoa.telefone ?? pessoaEditada.telefone,
      email: pessoa.email ?? pessoaEditada.email,
    });
  
    await pessoaEditada.save()

    return {
      status: HttpStatus.OK,
      message: 'Pessoa editada com sucesso!',
    }
  }

  private async validarSePessoaExiste(idPessoa: number) {
    const pessoa = await this.pessoaRepository.findByPk(idPessoa)
    if (pessoa == null) {
      throw new HttpException('Pessoa não encontrada.', HttpStatus.NOT_FOUND);
    }
    return pessoa
  }

  private async validarSeCPFExiste(cpf: string) {
    const pessoa = await this.buscarPessoaPorCpf(cpf)
    if (pessoa != null) {
      throw new HttpException('CPF já cadastrado.', HttpStatus.BAD_REQUEST);
    }
  }
}
