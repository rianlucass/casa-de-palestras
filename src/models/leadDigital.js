import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const LeadDigital = sequelize.define(
  "LeadDigital",
  {
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "leads_digital",
  }
);
