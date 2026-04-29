import { Router } from "express";
import { Lead } from "../models/contact.js";
import { enviarEmail } from "../services/emailService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { nome, email, empresa, mensagem } = req.body;

  try {
    // salvar no banco
    const lead = await Lead.create({ nome, email, empresa, mensagem });

    // enviar email
    await enviarEmail(lead);

    res.send({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro" });
  }
});

export default router;