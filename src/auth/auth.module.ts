import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PessoaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),],
  controllers: [AuthController],
  providers: [
    AuthService, 
    { provide: APP_GUARD, useClass: AuthGuard}
  ],
})
export class AuthModule {}
