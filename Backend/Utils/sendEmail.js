const nodemailer = require('nodemailer');
const serverConfig = require('../Config/serverConfig');

const sendEmail = async (options) => {
    try {

        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: serverConfig.SMTP_MAIL,
                pass: serverConfig.SMTP_PASSWORD
            },
        });

        // Define the email options
        const mailOptions = {
            from: serverConfig.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

       await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error.message);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
    }
};

module.exports = sendEmail;