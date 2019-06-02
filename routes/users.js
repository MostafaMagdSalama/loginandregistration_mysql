const express=require('express');
const User=require('../config/models/user');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const router=express.Router();

//login page

router.get('/login',(req,res)=>{
   // res.send("this is a login page");
   res.render("login",{
    messages:"mostafa"
   });
});

//registration 
router.get('/register',(req,res)=>{
   // res.send("this is a register page");
   res.render("register");
});
router.post('/register',(req,res)=>{
   const {email,password,password2}=req.body;
   var errors=[];
   if(!email || !password || !password2){
errors.push({
    msg:'please enter all fields'
});
   }
if(password!==password2){
    errors.push({
        msg:"the password does'match" 
    });
}    
if(password.length<3){
    errors.push({
        msg:"the password length must be longer" 
    });
}
if(errors.length>0){
    res.render('register',{errors});
}
else{
    User.findOne({
        where: {
          email: email
        }
      }).then((user)=>{
        if(user){
            errors.push({
                msg:"email was allready used" 
            });
            res.render('register',{errors});
        }
        else{
            const newUser = new User({
                email,
                password
              });
// encrypt password
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, (err, hash)=> {
       if(err)throw err;
       newUser.password=hash;
       newUser.save().then(user=>{
        req.flash(
            "sm",
            " your account is created ,please login"
          );
res.redirect('/users/login');
    })
    });
});
   



        }
        
    }).catch(err=>{
        console.log(err);
         req.flash("fm", "There an error");
        res.redirect('/users/register');
        
    });
}


});


router.post('/login',
  passport.authenticate('local', { successRedirect: '/index/dashboard',
                                   failureRedirect: '/users/login',
                                   failureFlash: true })
);

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/users/login');
});
module.exports=router;