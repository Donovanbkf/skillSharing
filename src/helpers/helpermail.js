const nodemailer = require('nodemailer');

const sendMail = (to, subject, message) => {
  // Configuración de transporte
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Contenido del correo electrónico
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: message
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
};

module.exports = { sendMail };