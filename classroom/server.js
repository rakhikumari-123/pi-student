const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");

app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}));
app.use(flash());


app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you sent a request ${req.session.count} times`);
})
//app.get("/test",(req,res)=>{
    //res.send("test successful");
//});

app.listen(3000,()=>{
    console.log("app is listening to port 3000");
});