import { Inject, Injectable } from '@nestjs/common';
import { Transferencia } from './Transferencia';
import { InjectModel } from '@nestjs/sequelize';
import { ContaService } from 'src/conta/conta.service';
import { TransferenciaDto } from 'src/dto/Transferencia.Dto';

@Injectable()
export class TransferenciaService {
  constructor(
    @InjectModel(Transferencia) private transferenciaRepository: typeof Transferencia,
    @Inject(ContaService) private contaService: ContaService
  ){}

  async transferir(transferenciaDto: TransferenciaDto): Promise<TransferenciaDto>{
    this.contaService.sacar(transferenciaDto.idContaOrigem, transferenciaDto.valor)
    this.contaService.depositar(transferenciaDto.idContaDestino, transferenciaDto.valor)

    const criarTransferencia = await this.transferenciaRepository.create({
      valor: transferenciaDto.valor,
      data: new Date(),
      id_conta_origem: transferenciaDto.idContaOrigem,
      id_conta_destino: transferenciaDto.idContaDestino
    })

    return criarTransferencia.save()
  }
}
