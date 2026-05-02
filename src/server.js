import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        console.log("Banco de dados sincronizado com sucesso.");
    })
    .catch(err => {
        console.error("Erro no Sequelize / Banco de Dados:", err);
    });

// Inicia o servidor mesmo se o banco de dados falhar
app.listen(PORT, () =>
    console.log("rodando na porta: " + PORT)
);