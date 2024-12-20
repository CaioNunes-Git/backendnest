import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import {  } from 'src/database/database.module';
import { Conta } from './Conta';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Conta])],
  controllers: [ContaController],
  providers: [ContaService],
})
export class ContaModule {}
