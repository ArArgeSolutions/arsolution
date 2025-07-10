import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,   
    },
  });

  const mailOptions = {
    from: email,
    to: "canankorkut1@gmail.com", // MAİLİN GİDECEĞİ YER
    subject: `Yeni mesaj: ${name}`,
    html: `
    <div style="font-family: sans-serif; line-height: 1.5;">
      <h2>Yeni Canlı Destek Mesajı</h2>
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Mesaj:</strong><br/>${message}</p>
    </div>
  `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail Hatası:", error);
    return res.status(500).json({ error: "Mail gönderilemedi" });
  }
}
