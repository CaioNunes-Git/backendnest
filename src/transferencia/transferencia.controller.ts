import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransferenciaService } from './transferencia.service';
import { Transferencia } from './Transferencia';

@Controller('transferencia')
export class TranferenciaController {
  constructor(private readonly transferenciaService: TransferenciaService) {}

  @Post()
  async transferir(@Body() transferencia: Transferencia): Promise<Transferencia>{
    return this.transferenciaService.transferir(transferencia)
  }
}
