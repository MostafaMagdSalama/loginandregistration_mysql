const express=require('express');
const router=express.Router();
const {isAuthenticated}=require('../config/auth');
//home page
router.get('/',(req,res)=>{
   // res.send("this is a home page");
   res.render("home");
});

//dashboard 
router.get('/dashboard',isAuthenticated,(req,res)=>{
   // res.send("this is a dashboard page");
   res.render("dashboard");
});
module.exports=router;