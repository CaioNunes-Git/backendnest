import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Conta } from "src/conta/Conta";

@Table({ tableName: "pessoa" })
export class Pessoa extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ field: "nome" })
    nome: string;

    @Column({ field: "telefone" })
    telefone: string;

    @Column({ field: "cpf" })
    cpf: string;

    @Column({ field: "email" })
    email: string;

    @Column({ field: "senha" })
    senha: string;

    @HasMany(() => Conta, { foreignKey: 'idPessoa' })
    contas: Conta[];
}
