import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';

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

  async cadastrar(pessoa: Partial<Pessoa>): Promise<Pessoa>{
    return this.pessoaRepository.create(pessoa)
  }
}
