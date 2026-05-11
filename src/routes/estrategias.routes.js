import { Router } from "express";
import { LeadDigital } from "../models/leadDigital.js";
import { enviarEmailEstrategias } from "../services/emailEstrategiasService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  try {
    // salvar no banco MySQL
    const lead = await LeadDigital.create({ nome, email, telefone, mensagem });

    // disparar os emails automático (interno e para o usuário)
    await enviarEmailEstrategias(lead);

    res.send({ ok: true });
  } catch (err) {
    console.error("Erro no formulário de Estratégias Digitais:", err);
    res.status(500).send({ error: "Erro interno no servidor." });
  }
});

export default router;
