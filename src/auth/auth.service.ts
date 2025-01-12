import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private pessoaService: PessoaService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, senha: string): Promise<{ access_token: string, id: number }> {
        if(email == null || senha == null){
            throw new UnauthorizedException("Digite suas credenciais de acesso.");
        }

        const pessoaUser = await this.pessoaService.buscarPessoaPorEmail(email);
        if (!await compare(senha, pessoaUser?.senha)) {
            throw new UnauthorizedException("Email e/ou senha incorretos.");
        }

        const payload = { sub: pessoaUser.id, username: pessoaUser.nome };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            id: pessoaUser.id
        };
    }
}
