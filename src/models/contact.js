import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Lead = sequelize.define(
  "Lead",
  {
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    empresa: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "leads",
  }
);