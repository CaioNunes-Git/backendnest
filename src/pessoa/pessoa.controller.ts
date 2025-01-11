import { Body, Controller, Get, Post } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './Pessoa';
import { InjectModel } from '@nestjs/sequelize';
import { PessoaDtoRequest } from 'src/dto/Pessoa.DtoRequest';
import { PessoaDtoResponse } from 'src/dto/Pessoa.DtoResponse';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('pessoa')
export class PessoaController {
  constructor(
    private readonly pessoaService: PessoaService) { }

  @Get()
  async listarTodos(): Promise<PessoaDtoResponse[]> {
    return this.pessoaService.listarTodos();
  }

  @Public()
  @Post("/cadastrar")
  async cadastrar(@Body() pessoa: PessoaDtoRequest): Promise<PessoaDtoResponse> {
    return this.pessoaService.cadastrar(pessoa)
  }
}
