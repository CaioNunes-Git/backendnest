import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransferenciaService } from './transferencia.service';
import { Transferencia } from './Transferencia';
import { TransferenciaDto } from 'src/dto/Transferencia.Dto';

@Controller('transferencia')
export class TranferenciaController {
  constructor(private readonly transferenciaService: TransferenciaService) {}

  @Post()
  async transferir(@Body() transferencia: TransferenciaDto): Promise<TransferenciaDto>{
    return this.transferenciaService.transferir(transferencia)
  }
}
