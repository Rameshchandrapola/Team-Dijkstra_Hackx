const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path');
const methodoverride = require('method-override');
const badgeRoutes = require('./routes/badge')
const PORT = process.env.PORT||3000
const ejsMate = require('ejs-mate');

//for ejs templet
const ejs = require('ejs');
app.engine('ejs', ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodoverride('_method'))


//load config
dotenv.config({path: './config/config.env'})
//connecting to database
connectDB()
app.use(express.urlencoded({extended:true}));

//routes
app.get('/',(req,res)=>{
    res.render('home')
})
app.use('/badge',badgeRoutes);

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
