export class TransferenciaDto {
    readonly id?: number;
    readonly valor: number;
    readonly data: Date;
    readonly contaOrigemId: number;
    readonly contaDestinoId: number;
}