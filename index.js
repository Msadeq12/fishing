const express = require('express');
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const webMail = express();
webMail.use(bodyParser.urlencoded({extended: false}));
webMail.use(express.static('public'));

webMail.set("views", "pages");
webMail.set("view engine", "ejs");

webMail.get('/', (req, res) => {
    res.render('mail');
});

webMail.post('/', (req, res) => {
    
})

webMail.listen(8080, () => {
    console.log("Listening at 8080. fishing ...");
}
)