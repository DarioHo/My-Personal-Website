const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.post('/submit-form', async (req, res) => {
    try {
        const { fname, lname, email, message } = req.body;

        const mailOptions = {
            from: process.env.SEND_EMAIL_ADDRESS,
            to: process.env.RECEIVE_EMAIL_ADDRESS,
            subject: 'Contact Form Submission',
            text: `Name: ${fname} ${lname}\nEmail: ${email}\nMessage: ${message}`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);

        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email. Please try again later.');
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}...`));
