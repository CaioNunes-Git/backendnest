import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conta } from './Conta';
import { ContaDto } from 'src/dto/Conta.Dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContaService {
  constructor(
    @InjectModel(Conta) private contaRepository: typeof Conta
  ) { }

  async listarTodos(): Promise<Conta[]> {
    return this.contaRepository.findAll()
  }

  public async buscarContaPorId(idConta: number): Promise<Conta> {
    return this.contaRepository.findByPk(idConta)
  }

  async buscarContaPorNumero(numConta: number): Promise<Conta> {
    return this.contaRepository.findOne({ where: { numConta: numConta } })
  }

  async buscarContaPorPessoa(idPessoa: number): Promise<Conta[]> {
    return this.contaRepository.findAll({ where: { idPessoa: idPessoa } })
  }

  public async depositar(idConta: number, valor: number) {
    const conta = await this.buscarContaPorId(idConta)
    conta.saldo += valor
    return conta.save()
  }

  public async sacar(idConta: number, valor:number) {
    const conta = await this.buscarContaPorId(idConta)

    if (conta.saldo < valor) {
      throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST);
  }
    conta.saldo -= valor;
    return conta.save()
  }

  async buscarSaldoPorId(id: number): Promise<number> {
    const conta = this.buscarContaPorId(id)
    return (await conta).saldo
  }

  async cadastrar(contaDto: ContaDto): Promise<Conta> {

    const contaMesmoTipo = await this.contaRepository.findOne({
      where: {
        idPessoa: contaDto.idPessoa,
        tipo_conta: contaDto.tipoContaEnum.valueOf(),
      }
    })
    if (contaMesmoTipo != null) {
      throw new HttpException('A pessoa já possui esse tipo de conta!', HttpStatus.BAD_REQUEST);
    }

    const conta = this.contaRepository.create({ 
      numConta: contaDto.numConta,
      digito: contaDto.digito,
      saldo: contaDto.saldo,
      idPessoa: contaDto.idPessoa,
      tipoContaEnum: contaDto.tipoContaEnum
    });

    (await conta).save
    return conta
    

  }
}