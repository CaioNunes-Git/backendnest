import { Controller, Get } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';

@Controller('pessoa')
export class PessoaController {
  constructor(
    private readonly pessoaService: PessoaService) {}

  @Get()
  async listarTodos(): Promise<Pessoa[]> {
    return this.pessoaService.listarTodos();
  }

}
