import { Module } from '@nestjs/common';
import { TranferenciaController } from './transferencia.controller';
import { TransferenciaService } from './transferencia.service';
import { Transferencia } from './Transferencia';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContaService } from 'src/conta/conta.service';
import { Conta } from 'src/conta/Conta';

@Module({
  imports: [SequelizeModule.forFeature([Transferencia,Conta])],
  controllers: [TranferenciaController],
  providers: [TransferenciaService, ContaService],
})
export class TransferenciaModule {}
