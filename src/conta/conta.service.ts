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
    this.validarSeContaExiste(idConta)
   
    return await this.contaRepository.findByPk(idConta)
  }

  async buscarContaPorNumero(numConta: string): Promise<Conta> {
    const numContaSplit = numConta.split('-')
    const conta = await this.contaRepository.findOne({ where: { numConta: numContaSplit[0], digito: numContaSplit[1] } })
    
    if (conta == null) {
      throw new HttpException('Conta não encontrada.', HttpStatus.NOT_FOUND);
    }

    return conta

  }

  async buscarContaPorPessoa(idPessoa: number): Promise<Conta[]> {
    return this.contaRepository.findAll({ where: { idPessoa: idPessoa } })
  }

  public async depositar(idConta: number, valor: any, tipoConta?: string) {

    await this.validarSeContaExiste(idConta)
    let conta = null 
    if (typeof tipoConta !== 'undefined') {
      conta = await this.buscarContaPorIdETipo(idConta, tipoConta)
    } else {
      conta = await this.buscarContaPorId(idConta)
    }
    
    conta.saldo += parseFloat(valor);
    await conta.save()
    return {
      status: HttpStatus.OK,
      message: 'Depósito efetuado com sucesso!',
      saldo: conta.saldo
    }
  }

  public async sacar(idConta: number, valor:any, tipoConta: string) {
    const conta = await this.buscarContaPorIdETipo(idConta, tipoConta)

    if (conta.saldo < valor) {
      throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST);
  }

    conta.saldo -= parseFloat(valor);
    await conta.save()
    return {
      status: HttpStatus.OK,
      message: 'Saque efetuado com sucesso!',
      saldo: conta.saldo
    }
  }

  async buscarSaldoPorId(id: number): Promise<number> {
    const conta = this.buscarContaPorId(id)
    return (await conta).saldo
  } 

  async buscarContaPorIdETipo(idConta: number, tipoConta: string): Promise<Conta> {
    return await this.contaRepository.findOne({
      where: {
        id: idConta,
        tipo_conta: tipoConta.toUpperCase()
      }
    })
  }

  async cadastrar(contaDto: ContaDto): Promise<Conta> {
    this.verificarContaMesmoTipo(contaDto)
    

    const conta = await this.contaRepository.create({ 
      numConta: contaDto.numConta,
      digito: contaDto.digito,
      saldo: contaDto.saldo,
      idPessoa: contaDto.idPessoa,
      tipoContaEnum: contaDto.tipoContaEnum
    });

    return conta
  }

  async editar(idConta: number, contaDto: ContaDto): Promise<Conta> {
    await this.validarSeContaExiste(idConta)
    const contaEditada = await this.buscarContaPorId(idConta)

    await this.verificarContaMesmoTipo(contaDto)

    Object.assign(contaEditada, {
      tipoContaEnum: contaDto.tipoContaEnum ?? contaEditada.tipoContaEnum,
    });
 
    await contaEditada.save()
    return contaEditada
  }


  async buscarTipoContaPorIdPessoa(idPessoa: number): Promise<string[]> {

    const conta = await this.contaRepository.findAll({
      where: {
        idPessoa: idPessoa
      }
    })

    return conta.map((conta) => conta.tipoContaEnum.valueOf())
  }

  async buscarContaPorIdPessoaETipoConta(idPessoa: number, tipoConta: string): Promise<Conta> {
    return await this.contaRepository.findOne({
      where: { 
        idPessoa: idPessoa,
        tipo_conta: tipoConta.toUpperCase()
      }
    })
  }

  private async validarSeContaExiste(id:number): Promise<void> {

    const conta = await this.contaRepository.findOne({
      where: {
        id:id
      }
    })

    if (conta == null) {
      throw new HttpException('Conta não encontrada.', HttpStatus.NOT_FOUND);
    } 
  }

  private async verificarContaMesmoTipo(contaDto: ContaDto): Promise<void> {
    const conta = await this.contaRepository.findOne({
      where: {
        idPessoa: contaDto.idPessoa,
        tipo_conta: contaDto.tipoContaEnum
      }
    })

    if (conta != null) {
      throw new HttpException('Tipo de Conta já cadastrado.', HttpStatus.BAD_REQUEST);
    }
  }
  
}
