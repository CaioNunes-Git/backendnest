import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  async transferir(@Body() transferencia: TransferenciaDto): Promise<TransferenciaDto>{
    return this.transferenciaService.transferir(transferencia)
  }
}
