import { Sequelize } from "sequelize-typescript";
import { Conta } from "../conta/Conta";
import { Pessoa } from "../pessoa/Pessoa";
import { Transferencia } from "../transferencia/Transferencia";

/*export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db.sqlite',
      });
      sequelize.addModels([Conta, Pessoa, Transferencia]);
      await sequelize.sync();
      return sequelize;
    },
  },
];*/