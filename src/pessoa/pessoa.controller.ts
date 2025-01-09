import { Body, Controller, Get, Post } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';
import { PessoaDto } from 'src/dto/Pessoa.Dto';

@Controller('pessoa')
export class PessoaController {
  constructor(
    private readonly pessoaService: PessoaService) {}

  @Get()
  async listarTodos(): Promise<Pessoa[]> {
    return this.pessoaService.listarTodos();
  }
  
  @Post("/cadastrar")
  async cadastrar(@Body() pessoa: PessoaDto): Promise<PessoaDto>{
    return this.pessoaService.cadastrar(pessoa)
  }
}
