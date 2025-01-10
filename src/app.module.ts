import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './pessoa/pessoa.module';
import { TransferenciaModule } from './transferencia/transferencia.module';
import { ContaModule } from './conta/conta.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from './pessoa/Pessoa';
import { Transferencia } from './transferencia/Transferencia';
import { Conta } from './conta/Conta';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'db.sqlite', 
      autoLoadModels: true,
      synchronize: true,
      models:[Pessoa, Transferencia, Conta]
    }),
    PessoaModule, TransferenciaModule, ContaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
