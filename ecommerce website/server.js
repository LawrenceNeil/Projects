const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

//app.get("/",(req, res) =>{
//    res.render('index');
//})

app.use('/', require('./routes/pages'));
app.use('/products', require('./routes/products'));
app.listen(3000, () =>{
    console.log("Server is up and running");
})