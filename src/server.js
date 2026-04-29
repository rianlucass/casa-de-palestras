import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () =>
        console.log("rodando em http://localhost:" + PORT)
    );
});