import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';
import { PessoaDtoRequest } from 'src/dto/Pessoa.DtoRequest';
import { PessoaDtoResponse } from 'src/dto/Pessoa.DtoResponse';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa) private pessoaRepository: typeof Pessoa
  ) { }

  async listarTodos(): Promise<PessoaDtoResponse[]> {
    return this.pessoaRepository.findAll()
  }

  async listarPorId(id: number) {
    return this.pessoaRepository.findByPk(id)
  }

  async cadastrar(pessoa: PessoaDtoRequest): Promise<PessoaDtoResponse> {
    return await this.pessoaRepository.create({
      nome: pessoa.nome,
      telefone: pessoa.telefone,
      cpf: pessoa.cpf,
      email: pessoa.email,
      senha: pessoa.senha
    })
  }
}
