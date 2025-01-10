import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constantes';

@Module({
  imports: [
    PessoaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
