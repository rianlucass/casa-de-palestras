import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import contatoRoutes from "./routes/contact.routes.js";
import estrategiasRoutes from "./routes/estrategias.routes.js";
import mentoriaRoutes from "./routes/mentoria.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.engine("handlebars", engine({
  partialsDir: join(__dirname, "../views/partials"),
  layoutsDir: join(__dirname, "../views/layouts"),
  defaultLayout: "main",
  helpers: {
    range(start, end) {
      const arr = [];
      for (let i = start; i <= end; i++) arr.push(i);
      return arr;
    }
  }
}));
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "../views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));

app.get("/", (req, res) => 
    res.render("pages/home")
);
app.get("/curadoria", (req, res) => 
    res.render("pages/curadoria")
);
app.get("/estrategias", (req, res) => 
    res.render("pages/estrategias")
);
app.get("/mentoria", (req, res) => 
    res.render("pages/mentoria")
);
app.get("/sobre", (req, res) =>
    res.render("pages/sobre")
);

app.use("/contato", contatoRoutes);
app.use("/api/estrategias", estrategiasRoutes);
app.use("/api/mentoria", mentoriaRoutes);

export default app;