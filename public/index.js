const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path:path.resolve(__dirname,'../.env')});
// console.log(path.resolve(__dirname))

const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//db & model
require('../db/db');
// const routerPath = require('../router/router');
// app.use(routerPath);

//static path
app.set("view engine","hbs");
const staticPath = path.join(__dirname);
app.use(express.static(staticPath));

// template path
const templatePath = path.join(__dirname,'../template/views');
app.set('views',templatePath);

const partialPath = path.join(__dirname,'../template/partials');
// console.log(partialPath);
hbs.registerPartials(partialPath);

//Register => model
const Register = require('../model/model');

app.get('/register',(req,res) => {
    res.render('register');
})

app.get('/login',(req,res) => {
    res.render('login');
})

app.get('/about',(req,res) => {
    res.render('about');
})

app.get('/general',(req,res) => {
    res.render('general');
})

app.get('/social',(req,res) => {
    res.render('social');
})

app.get('/sport',(req,res) => {
    res.render('sport');
})

app.get('/cultural',(req,res) => {
    res.render('cultural');
})

app.get('/addEvent',(req,res) => {
    res.render('addEvent');
})

app.get('/livescreen',(req,res) => {
  res.render('livescreen');
})

app.get('/letsVisit',(req,res) => {
    res.render('letsVisit');
})

app.get('/livestreamreview',(req,res) => {
  res.render('livestreamreview');
})

app.post("/register", async (req, res) => {
    const { name, email, phone, password, cPassword, gender } = req.body;
    console.log(name)
  
    if (!name || !email || !phone || !password || !cPassword) {
      return res.status(404).json({ error: "Please,Fil all the Fields" });
    }
  
    const userExist = await Register.findOne({ email });
    if (userExist) {
      return res.status(200).json({ error: "User Exist" });
    }
    if (password !== cPassword) {
      return res.status(404).json({ error: "Password are not Matching" });
    }
  
    try {
      const data = new Register({
        name,
        email,
        password,
        cPassword,
        gender,
        phone,
      });
      
      await data.save();
      res.redirect('general')
  
      // return res.status(200).json({ message: "Registration Successfully" });
    } catch (err) {
      return res.status(404).json({ error: "Registration Failed" });
    }
  });
  

app.post('/login',async(req,res) => {
    try{
      const {email,password} = req.body;
  
      const data = await Register.findOne({email:email});
      console.log(email);
    
      if(!data){
        res.render('register');
      }
  
      if(data){
        if(data.password === password){
            res.render('general')
        }else{
            res.status(404).json({err:"Login Failed"})
        }
      }
  
  
    }catch(err){
      res.status(404).json({err:"Login Failed"});
    }
  });


app.listen(port,() => {
    console.log("Port : " + port);
})