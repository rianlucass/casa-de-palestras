import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Valida em tempo de inicialização para falhar cedo se faltar configuração
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error(
    "Variáveis de ambiente EMAIL_USER e EMAIL_PASS são obrigatórias."
  );
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false = STARTTLS na porta 587 (recomendado pelo Google)
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarEmail(lead) {
  const remetente = `"Casa de Palestras" <${process.env.EMAIL_USER}>`;

  // ── 1. Notificação interna ────────────────────────────────────────
  const notificacaoInterna = {
    from: remetente,
    to: process.env.EMAIL_DEST ?? process.env.EMAIL_USER,
    subject: `Novo contato de ${lead.nome}`,
    text: [
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email || "não informado"}`,
      `Empresa: ${lead.empresa || "não informada"}`,
      `Mensagem: ${lead.mensagem}`,
    ].join("\n"),
    html: `
      <h2 style="font-family:sans-serif;color:#111827;">Novo contato recebido</h2>
      <table style="font-family:sans-serif;font-size:14px;color:#374151;border-collapse:collapse;">
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Nome</td><td>${lead.nome}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">E-mail</td><td>${lead.email || "—"}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Empresa</td><td>${lead.empresa || "—"}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Mensagem</td><td style="white-space:pre-line;">${lead.mensagem}</td></tr>
      </table>
    `,
  };

  await transporter.sendMail(notificacaoInterna);

  // ── 2. Resposta automática ao cliente (só se tiver e-mail válido) ─
  if (lead.email) {
    const respostaCliente = {
      from: remetente,
      to: lead.email,
      subject: "Recebemos sua solicitação — Casa de Palestras",
      text: [
        `Olá, ${lead.nome}!`,
        "",
        "Recebemos sua solicitação e nossa equipe já está analisando o contexto do seu evento.",
        "Em breve entraremos em contato com a indicação mais adequada para o seu momento.",
        "",
        "Atenciosamente,",
        "Equipe Casa de Palestras",
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#374151;">
          <div style="background:#38b6ff;padding:28px 40px;border-radius:12px 12px 0 0;">
            <!-- Em produção, substitua pelo texto abaixo por uma tag <img> com URL absoluta:  -->
            <!-- <img src="https://casadepalestras.com.br/img/logo/logo.png" alt="Casa de Palestras" style="width:140px;display:block;"> -->
            <span style="font-family:sans-serif;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
              Casa de Palestras
            </span>
          </div>
          <div style="background:#ffffff;padding:36px 40px;border-radius:0 0 12px 12px;border:1px solid #E5E7EB;border-top:none;">
            <p style="font-size:16px;margin:0 0 16px;">Olá, <strong>${lead.nome}</strong>!</p>
            <p style="font-size:15px;line-height:1.7;margin:0 0 16px;color:#4B5563;">
              Recebemos sua solicitação e nossa equipe já está analisando o contexto do seu evento.
            </p>
            <p style="font-size:15px;line-height:1.7;margin:0 0 32px;color:#4B5563;">
              Em breve entraremos em contato com mais informações e a indicação mais adequada para o seu momento.
            </p>
            <p style="font-size:14px;color:#9CA3AF;margin:0;">
              Atenciosamente,<br>
              <strong style="color:#374151;">Equipe Casa de Palestras</strong>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(respostaCliente);
  }
}


