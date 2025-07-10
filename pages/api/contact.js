import nodemailer from "nodemailer";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 2,       // 5 istek hakkı
  duration: 60,    // 60 saniyede
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Rate limit kontrolü
  try {
    await rateLimiter.consume(
      req.headers["x-forwarded-for"] || req.socket.remoteAddress
    );
  } catch {
    return res.status(429).json({
      error: "Çok fazla istek gönderildi. Lütfen biraz bekleyin.",
    });
  }

  // reCAPTCHA doğrulama
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ error: "reCAPTCHA token eksik." });
  }

  const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const recaptchaData = await recaptchaRes.json();
  if (!recaptchaData.success) {
    return res.status(400).json({ error: "reCAPTCHA doğrulaması başarısız." });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_SEND,
    to: "oxyloopai@gmail.com",
    subject: `Yeni mesaj: ${name}`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; line-height: 1.6;">
        <h2>📩 Yeni Canlı Destek Mesajı</h2>
        <p><strong>👤 Ad Soyad:</strong> ${name}</p>
        <p><strong>📧 E-posta:</strong> ${email}</p>
        <p><strong>📝 Mesaj:</strong><br/>${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail Hatası:", error);
    return res.status(500).json({ error: "Mail gönderilemedi." });
  }
}
