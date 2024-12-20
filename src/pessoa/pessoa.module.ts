import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './Pessoa';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa])],
  controllers: [PessoaController],
  providers: [PessoaService],
})

export class PessoaModule {}
