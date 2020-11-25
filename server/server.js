require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('<h1>bienvenidos a mi servidor rest (localhost)</h1>');
});

app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafeteria',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}, (err, res) => {
    if (err) throw err;
     console.log('base de datos online')
});

app.listen(process.env.PORT, () => {
    console.log('el servidor esta en linea por el puerto ', process.env.PORT);
});