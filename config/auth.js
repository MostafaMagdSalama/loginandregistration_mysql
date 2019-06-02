module.exports={
    isAuthenticated:  function(req,res,next){
        if(req.isAuthenticated()){
            return next();

            
        }
      
            req.flash('fm',"you don't have a permmission");
            res.redirect('/users/login');
       

    }
}