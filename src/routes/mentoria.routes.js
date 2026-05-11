import { Router } from "express";
import { LeadMentoria } from "../models/leadMentoria.js";
import { enviarEmailMentoria } from "../services/emailMentoriaService.js";

const router = Router();

router.post("/", async (req, res) => {
  const nome = req.body?.nome?.trim();
  const email = req.body?.email?.trim();
  const telefone = req.body?.telefone?.trim();
  const mensagem = req.body?.mensagem?.trim();

  if (!nome || !email || !telefone || !mensagem) {
    return res.status(400).send({ error: "Preencha os campos obrigatórios." });
  }

  try {
    // Salvar no banco MySQL
    const lead = await LeadMentoria.create({ nome, email, telefone, mensagem });

    // Disparar e-mails automáticos (interno + resposta ao cliente)
    await enviarEmailMentoria(lead);

    res.send({ ok: true });
  } catch (err) {
    console.error("Erro no formulário de Mentoria:", err);
    res.status(500).send({ error: "Erro interno no servidor." });
  }
});

export default router;
