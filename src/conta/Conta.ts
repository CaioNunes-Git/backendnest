import { AutoIncrement, BelongsTo, Column, DataType, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoa/Pessoa";
import { Transferencia } from "src/transferencia/Transferencia";

@Table({tableName:"conta"})
export class Conta extends Model{
 
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({field:"num_conta"})
    numConta: number

    @Column({field:"digito"})
    digito: number 

    @Column({field:"saldo"})
    saldo: number
 
    idPessoa: number

    @Column({ 
        field: "tipo_conta" ,
        type: DataType.ENUM("POUPANCA","CORRENTE") 
    })  
    tipoContaEnum: TipoContaEnum; 

    @HasOne(() => Transferencia, { foreignKey: 'id_conta_origem' })
    transferenciasOrigem: Transferencia[];

    @HasOne(() => Transferencia, { foreignKey: 'id_conta_destino' })
    transferenciasDestino: Transferencia[];  

}