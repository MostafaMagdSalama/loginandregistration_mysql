const express=require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require("passport");
const app=express();
const port=3000||process.env.port;

//const user=require('./config/models/user');
app.get('/',(req,res)=>{
    // res.send("this is a login page");
    res.render("home");
 });
 

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  require('./config/passport');
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


  app.use((req, res, next) => {
    res.locals.sm = req.flash("sm");
    res.locals.fm = req.flash("fm");
    res.locals.error = req.flash("error");
  
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/index',require('./routes/index'));
app.use('/users',require('./routes/users'));
//config









//handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.listen(3000,()=>{
    console.log(`application is lisren in port ${port}`);
});

