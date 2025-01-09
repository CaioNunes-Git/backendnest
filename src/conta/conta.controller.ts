import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Conta } from './Conta';
import { ContaDto } from 'src/dto/Conta.Dto';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Get()
  async listarTodos(): Promise<Conta[]> {
    return this.contaService.listarTodos();
  }
  
  @Get("/:id")
  async buscarContaPorId(@Param('id') idConta:number): Promise<Conta>{
    return this.contaService.buscarContaPorId(idConta)
  }

  @Get("/numconta/:numConta")
  async buscarContaPorNumero(@Param('numConta') numConta:number): Promise<Conta>{
    return this.contaService.buscarContaPorNumero(numConta)
  }

  
  @Get("/pessoa/:idPessoa")
  async buscarContaPorPessoa(@Param('idPessoa') idPessoa:number): Promise<Conta[]>{
    return this.contaService.buscarContaPorPessoa(idPessoa)
  }

  @Post("/depositar/:id")
  async depositar(@Param('id') idConta:number, @Body() valor:number){
    return this.contaService.depositar(idConta,valor)
  }

  @Post("/sacar/:id")
  async sacar(idConta:number, valor:number){
    const conta = await this.buscarContaPorId(idConta)
    conta.saldo < valor ? new Error('Saldo insuficiente') : conta.saldo -= valor

    return conta.save()
  }

  async buscarSaldoPorId(id:number): Promise<number>{
    const conta = this.buscarContaPorId(id)
    return (await conta).saldo
  }

  @Post("/cadastrar")
  async cadastrar(@Body() conta: ContaDto): Promise<ContaDto>{
    return this.contaService.cadastrar(conta)
  }
}
