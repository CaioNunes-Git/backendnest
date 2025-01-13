import { Inject, Injectable } from '@nestjs/common';
import { Transferencia } from './Transferencia';
import { InjectModel } from '@nestjs/sequelize';
import { ContaService } from 'src/conta/conta.service';
import { TransferenciaDto } from 'src/dto/Transferencia.Dto';
import { addHours } from 'date-fns';
import { Op } from 'sequelize';


@Injectable()
export class TransferenciaService {
  constructor(
    @InjectModel(Transferencia) private transferenciaRepository: typeof Transferencia,
    @Inject(ContaService) private contaService: ContaService
  ) { }

  async listarTodos(): Promise<Transferencia[]> {
    return await this.transferenciaRepository.findAll()
  }

  async buscarTransferenciasPorConta(idConta: number): Promise<Transferencia[]> {
    return await this.transferenciaRepository.findAll({
      where: {
        [Op.or]: [
          { id_conta_origem: idConta },
          { id_conta_destino: idConta }
        ]
      }
    })
  }

  async buscarTransferenciasPorPessoa(idPessoa: number): Promise<any[]> {
    const contas = await this.contaService.buscarContaPorPessoa(idPessoa);
    const idsContas = contas.map(conta => conta.id);

    const transferencias = await this.transferenciaRepository.findAll({
      where: {
        [Op.or]: [
          { id_conta_origem: { [Op.in]: idsContas } },
          { id_conta_destino: { [Op.in]: idsContas } },
        ],
      },
    });

    const transferenciasDetalhadas = await Promise.all(transferencias.map(async transferencia => {
      const contaDestino = await this.contaService.buscarContaPorId(transferencia.id_conta_destino);
      const contaOrigem = await this.contaService.buscarContaPorId(transferencia.id_conta_origem);
      return {
        ...transferencia.toJSON(),
        contaDestino: contaDestino ? {
          id: contaDestino.id,
          numConta: contaDestino.numConta,
          digito: contaDestino.digito,
        } : null,
        contaOrigem: contaOrigem ? {
          id: contaOrigem.id,
          numConta: contaOrigem.numConta,
          digito: contaOrigem.digito,
        } : null,
      };
    }));
    return transferenciasDetalhadas;
  }

  async transferir(transferenciaDto: TransferenciaDto, tipoContaOrigem: any): Promise<any> {
    await this.contaService.sacar(transferenciaDto.idContaOrigem, transferenciaDto.valor, tipoContaOrigem.tipoConta)
    await this.contaService.depositar(transferenciaDto.idContaDestino, transferenciaDto.valor)
 
    const criarTransferencia = await this.transferenciaRepository.create({
      valor: transferenciaDto.valor,
      data: addHours(new Date(), -3),
      id_conta_origem: transferenciaDto.idContaOrigem,
      id_conta_destino: transferenciaDto.idContaDestino
    })

    await criarTransferencia.save()

    return { 
      status: 200,
      message: 'Transferência efetuada com sucesso!',
    }
  }
}
