import { Inject, Injectable } from '@nestjs/common';
import { Transferencia } from './Transferencia';
import { InjectModel } from '@nestjs/sequelize';
import { ContaService } from 'src/conta/conta.service';

@Injectable()
export class TransferenciaService {
  constructor(
    @InjectModel(Transferencia) private transferenciaRepository: typeof Transferencia,
    @Inject(ContaService) private contaService: ContaService
  ){}

  async transferir(transferencia: Transferencia): Promise<Transferencia>{
    this.contaService.sacar(transferencia.contaOrigem.id, transferencia.valor)
    this.contaService.depositar(transferencia.contaDestino.id, transferencia.valor)

    const criarTransferencia = await this.transferenciaRepository.create({
      valor: transferencia.valor,
      data: new Date(),
      id_conta_origem: transferencia.contaOrigem.id,
      id_conta_destino: transferencia.contaDestino.id
    })

    return criarTransferencia.save()
  }
}
