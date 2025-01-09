import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';
import { PessoaDto } from 'src/dto/Pessoa.Dto';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa) private pessoaRepository: typeof Pessoa
  ){}

  async listarTodos(): Promise<Pessoa[]> {
    return this.pessoaRepository.findAll()
  }

  async listarPorId(id:number){
    return this.pessoaRepository.findByPk(id)
  }

  async cadastrar(pessoa: PessoaDto): Promise<PessoaDto>{
    return this.pessoaRepository.create({
      nome: pessoa.nome,
      telefone: pessoa.telefone,
      cpf: pessoa.cpf,
      email: pessoa.email
    })
  }
}
