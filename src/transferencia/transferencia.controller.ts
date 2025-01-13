import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { TransferenciaService } from './transferencia.service';
import { Transferencia } from './Transferencia';
import { TransferenciaDto } from 'src/dto/Transferencia.Dto';

@Controller('transferencia')
export class TranferenciaController {
  constructor(private readonly transferenciaService: TransferenciaService) {}

  @Get()
  async listarTodos(): Promise<Transferencia[]> {
    return this.transferenciaService.listarTodos();
  }

  @Get("/conta/:id")
  async buscarTransferenciasPorConta(@Param('id') idConta:number): Promise<Transferencia[]>{
    return this.transferenciaService.buscarTransferenciasPorConta(idConta)
  }

  @Get('/pessoa/:idPessoa')
  async buscarTransferenciasPorPessoa(@Param('idPessoa') idPessoa: number): Promise<Transferencia[]> {
    return this.transferenciaService.buscarTransferenciasPorPessoa(idPessoa);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async transferir(@Body() transferencia: TransferenciaDto, @Body() tipoContaOrigem: string): Promise<TransferenciaDto>{
    return this.transferenciaService.transferir(transferencia, tipoContaOrigem)
  }
}
