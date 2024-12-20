import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conta } from './Conta';

@Injectable()
export class ContaService {
  constructor(
    @InjectModel(Conta) private contaRepository: typeof Conta
  ){}

  async listarTodos(): Promise<Conta[]>{
    return this.contaRepository.findAll()
  }
  
  public async buscarContaPorId(idConta:number): Promise<Conta>{
    return this.contaRepository.findByPk(idConta)
  }

  async buscarContaPorNumero(numConta:number): Promise<Conta>{
    return this.contaRepository.findOne({where : {numConta: numConta}})
  }

  public async depositar(idConta:number, valor:number){
    const conta = await this.buscarContaPorId(idConta)
    conta.saldo += valor
    return conta.save()
  }

  public async sacar(idConta:number, valor:number){
    const conta = await this.buscarContaPorId(idConta)
    conta.saldo < valor ? new Error('Saldo insuficiente') : conta.saldo -= valor

    return conta.save()
  }

  async buscarSaldoPorId(id:number): Promise<number>{
    const conta = this.buscarContaPorId(id)
    return (await conta).saldo
  }
  
  async cadastrar(conta: Partial<Conta>): Promise<Conta>{
    const contaMesmoTipo = this.contaRepository.findOne({ 
      where:{
        idPessoa: conta.pessoa.id,
        tipo_conta: conta.tipoContaEnum.valueOf(),
    }
  })
    if(contaMesmoTipo != null){
      new Error("A pessoa já possui esse tipo de conta!")
    }
    
    return this.contaRepository.create(conta)    

  }
}