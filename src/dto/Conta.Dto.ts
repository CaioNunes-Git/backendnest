import { Pessoa } from "src/pessoa/Pessoa"


export class ContaDto{

    readonly id?: number

    readonly numConta: number

    readonly digito: number

    readonly saldo: number

    readonly idPessoa: number

    readonly tipoContaEnum: TipoContaEnum
}