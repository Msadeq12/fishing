const express = require('express');
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const nodemailer = require('nodemailer');


const webMail = express();
webMail.use(bodyParser.urlencoded({extended: false}));
webMail.use(express.static('templates'));
webMail.use(express.static(__dirname));


webMail.set("views", "pages");
webMail.set("view engine", "ejs");

webMail.get('/', (req, res) => {
    res.render('mail');
});

webMail.post('/', (req, res) => {

    let address = req.body.name;
    let subject = req.body.subject;

    let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        service: 'yahoo',
        secure: true,
        auth: {
            user: "munfinancial@yahoo.com",
            pass: "bbsswjlzntzurfne"
        }       
    });

    let mailOptions = {
        from: 'Memorial University of Newfoundland <munfinancial@yahoo.com>',
        to: address,
        subject: subject,
        html: {
            path: "./templates/uni.html"
        },
        attachments: [{
            filename: 'mun.jpeg',
            path: __dirname + '/images/mun.jpeg',
            cid: 'pic1214'
        }]
    }

    transporter.sendMail(mailOptions, (err, data) => {

        if(err){
            console.log("Error: " + err);
        }

        else{
            console.log("Email sent: " + address);
        }

    });
    
});

webMail.listen(8080, () => {
    console.log("Listening at 8080. fishing ...");
}
)