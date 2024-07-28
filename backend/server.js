const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const pdfParser = require('pdf-parse');
const port = 5000 || process.env.PORT;
require('dotenv').config();

const temp = require('./models/templates');

require('./config/db')();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(upload.single('file'));

app.use('/',require('./routes/user'));

app.get('/',(req,res)=>{
    res.send("backend is live");
});

app.listen(port, () => {
    console.log("server is running on port " + port);
})