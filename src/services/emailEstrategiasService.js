import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Variáveis de ambiente EMAIL_USER e EMAIL_PASS são obrigatórias.");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarEmailEstrategias(lead) {
  const remetente = `"Casa de Palestras" <${process.env.EMAIL_USER}>`;

  // ── 1. Notificação interna
  const notificacaoInterna = {
    from: remetente,
    to: process.env.EMAIL_DEST ?? process.env.EMAIL_USER,
    subject: `Novo Lead Digital/Estratégias: ${lead.nome}`,
    text: [
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email}`,
      `Telefone: ${lead.telefone}`,
      `Mensagem: ${lead.mensagem}`
    ].join("\n"),
    html: `
      <h2 style="font-family:sans-serif;color:#111827;">Novo contato (Estratégias Digitais)</h2>
      <table style="font-family:sans-serif;font-size:14px;color:#374151;border-collapse:collapse;">
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Nome</td><td>${lead.nome}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">E-mail</td><td>${lead.email}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Telefone</td><td>${lead.telefone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Mensagem</td><td style="white-space:pre-line;">${lead.mensagem}</td></tr>
      </table>
    `,
  };

  await transporter.sendMail(notificacaoInterna);

  // ── 2. Resposta automática ao cliente
  if (lead.email) {
    const respostaCliente = {
      from: remetente,
      to: lead.email,
      subject: "Estratégia Digital — Casa de Palestras",
      text: [
        `Olá, ${lead.nome}!`,
        "",
        "Recebemos sua mensagem! Obrigado pelo interesse em estruturar sua Presença e Estratégia Digital.",
        "Nossa equipe já está avaliando sua solicitação e logo entraremos em contato para definir os próximos passos na construção da sua autoridade e presença digital.",
        "",
        "Atenciosamente,",
        "Equipe Casa de Palestras",
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#374151;">
          <div style="background:linear-gradient(135deg,#E406B8 0%,#ff6ef7 100%);padding:28px 40px;border-radius:12px 12px 0 0;">
            <span style="font-family:sans-serif;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
              Casa de Palestras
            </span>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:0.5px;">
              ESTRATÉGIA DIGITAL
            </p>
          </div>
          <div style="background:#ffffff;padding:36px 40px;border-radius:0 0 12px 12px;border:1px solid #E5E7EB;border-top:none;">
            <p style="font-size:16px;margin:0 0 16px;">Olá, <strong>${lead.nome}</strong>!</p>
            <p style="font-size:15px;line-height:1.7;margin:0 0 16px;color:#4B5563;">
              Recebemos sua mensagem! Obrigado pelo interesse em estruturar sua Presença e Estratégia Digital.
            </p>
            <p style="font-size:15px;line-height:1.7;margin:0 0 24px;color:#4B5563;">
              Nossa equipe já está avaliando sua solicitação e logo entraremos em contato para definir os próximos passos na construção da sua autoridade e presença digital.
            </p>
            <div style="background:#F3F4F6;border-left:4px solid #E406B8;border-radius:4px;padding:16px 20px;margin-bottom:32px;">
              <p style="font-size:14px;color:#4B5563;margin:0;line-height:1.6;">
                <strong>Sua mensagem registrada:</strong><br>
                ${lead.mensagem}
              </p>
            </div>
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
