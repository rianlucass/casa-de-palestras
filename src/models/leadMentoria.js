import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const LeadMentoria = sequelize.define(
  "LeadMentoria",
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
    objetivo: {
      // área de atuação / objetivo da mentoria
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "leads_mentoria",
  }
);
