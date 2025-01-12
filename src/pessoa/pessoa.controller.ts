import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get("/:id")
  async listarPorId(@Param('id') id: number): Promise<PessoaDtoResponse> {
    return this.pessoaService.listarPorId(id);
  }

  @Public()
  @Post("/cadastrar")
  async cadastrar(@Body() pessoa: PessoaDtoRequest): Promise<PessoaDtoResponse> {
    return this.pessoaService.cadastrar(pessoa)
  }

  @Put("/editar/:id")
  async atualizar(@Param('id') id: number, @Body() pessoa: PessoaDtoRequest): Promise<PessoaDtoResponse> {
      return this.pessoaService.editar(id, pessoa)
  }
}
