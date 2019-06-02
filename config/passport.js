const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User=require('../config/models/user');


passport.use(new LocalStrategy({usernameField:"email"},
    (email,password,done)=>{
User.findOne({where:{
    email:email
}}).then(user=>{
    if(!user){
        console.log('user dosent exist');
       return   done(null, false, { message: " User was not found" });
        
    }
    else{
        bcrypt.compare(password,user.password,(err,valid)=>{
            if(err)throw err;
            if(valid){
                console.log('the password is valid');
                return done(null,user);      
            }
            else{
                console.log("the password is invalid ");
                return done(null,false,{message:'invalid password'});
                
            }
        });
    }

}).catch(err=>{
    console.log('there is an error');
})
    }
        ));

   passport.serializeUser(function(user, done) {
    console.log(" serl started");
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: {
        id: id
      }
    })
      .then(user => {
        done(null, user);
      })
      .catch(err => console.log(err));
  });







