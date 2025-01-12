import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
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
  async buscarContaPorNumero(@Param('numConta') numConta:string): Promise<Conta>{
    return this.contaService.buscarContaPorNumero(numConta)
  }

  
  @Get("/pessoa/:idPessoa")
  async buscarContaPorPessoa(@Param('idPessoa') idPessoa:number): Promise<Conta[]>{
    return this.contaService.buscarContaPorPessoa(idPessoa)
  }

  //@Get("/saldo/:id")
  async buscarSaldoPorId(id:number): Promise<number>{
    const conta = this.buscarContaPorId(id)
    return (await conta).saldo
  }

  @Get("/tipoConta/:idPessoa")
  async buscarTipoContaPorIdPessoa(@Param('idPessoa') idPessoa:number): Promise<string[]>{
    return await this.contaService.buscarTipoContaPorIdPessoa(idPessoa)
  }

  @Get("/idpessoatipoconta/:idPessoa/:tipoConta")
  async buscarContaPorIdPessoaETipoConta(@Param('idPessoa') idPessoa:number, @Param('tipoConta') tipoConta:string): Promise<Conta>{
    return this.contaService.buscarContaPorIdPessoaETipoConta(idPessoa, tipoConta)
  }  

  @Post("/depositar/:id")
  @HttpCode(HttpStatus.OK)
  async depositar(@Param('id') idConta:number, @Body() valor:any, @Body() tipoConta: any){
    return this.contaService.depositar(idConta, valor.valor, tipoConta.tipoConta)
  } 

  @Post("/sacar/:id")
  @HttpCode(HttpStatus.OK)
  async sacar(@Param('id') idConta:number, @Body() valor:any, @Body() tipoConta: any){
    return this.contaService.sacar(idConta, valor.valor, tipoConta.tipoConta)
  }


  @Post("/cadastrar")
  async cadastrar(@Body() conta: ContaDto): Promise<ContaDto>{
    return this.contaService.cadastrar(conta)
  }

  @Put("/editar/:id")
  async editar(@Param('id') idConta:number, @Body() conta: ContaDto): Promise<ContaDto>{
    return this.contaService.editar(idConta, conta)
  }
}
