const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000
const nodemailer = require('nodemailer')
require('dotenv').config()

const emailTo = process.env.MAIL_TO || "diwakar@byldd.com"

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

app.post('/sendTopForm', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const html = `
        <p>New enquiry for lodha Woods</p>
        <p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <p>Phone: ${req.body.phone}</p>
    `
    let mailOptions = {
        from: "developernishantsingh@gmail.com",
        to: emailTo,
        subject: 'New enquiry for lodha Woods',
        html
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error " + err);
            res.send({ err: "Issue while sending email" })
        } else {
            res.send({ message: "Email sent Successfully" })
        }
    });
})

app.post('/sendBottomForm', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const html = `
    <p>New enquiry for lodha Woods</p>
    <p>Name: ${req.body.name}</p>
    <p>Email: ${req.body.email}</p>
    <p>Phone: ${req.body.phone}</p>
    <p>Subject: ${req.body.subject}</p>
    <p>Message: ${req.body.message}</p>
`
    let mailOptions = {
        from: "developernishantsingh@gmail.com",
        to: emailTo,
        subject: 'New enquiry for lodha Woods',
        html
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error " + err);
            res.send({ err: "Issue while sending email" })
        } else {
            res.send({ message: "Email sent Successfully" })
        }
    });
})

app.listen(port, () => {
    console.log(`server is listening at port: ${port}`)
})