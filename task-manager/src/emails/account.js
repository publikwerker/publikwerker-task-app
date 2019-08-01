const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = process.env.SENDGRID_API_KEY || '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'hello@publikwerks.com',
    subject: 'Thank You, and Welcome',
    text: `Wecome to the app, ${name}. Let us know how it works for you.`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'hello@publikwerks.com',
    subject: 'We are sorry to see you go.',
    text: `You account has been deleted, ${name}. Is there anything we could have done differently?`
  })
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }