import { Router } from "express";
import { Lead } from "../models/contact.js";
import { enviarEmailContato } from "../services/emailContatoService.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/contato");
});

router.post("/", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  try {
    // salvar no banco (empresa recebe telefone para compatibilidade com o modelo)
    const lead = await Lead.create({ nome, email, empresa: telefone, mensagem });

    // enviar email
    await enviarEmailContato({ nome, email, telefone, mensagem });

    res.send({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro" });
  }
});

export default router;