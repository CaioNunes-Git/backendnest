import { AutoIncrement, BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Conta } from "src/conta/Conta";

@Table({ tableName: "transferencia" })
export class Transferencia extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
 
    @Column({field:"valor"})
    valor: number;

    @Column({field:"data"})
    data: Date;
    
    @ForeignKey(() => Conta)
    @Column({ field: "id_conta_origem" })
    idContaOrigem: number;

    @BelongsTo(() => Conta, { foreignKey: 'id_conta_origem' })  
    contaOrigem: Conta;
     
    @ForeignKey(() => Conta)
    @Column({ field: "id_conta_destino" })
    idContaDestino: number;

    @BelongsTo(() => Conta, { foreignKey: 'id_conta_destino' })  
    contaDestino: Conta; 
}