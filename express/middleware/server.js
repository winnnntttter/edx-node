
const express = require('../../node_modules/express');//('express')也可以
const app = express();

app.use((req,res,next)=>{//middleware
  console.log(`${req.method}:${req.url}`)
  next();
})
app.use((req,res,next)=>{//middleware
  console.log(`${req.method}:${req.url}`)
  if(req.query.api_key){
    next();
  }else{
    res.status(401).send({'msg':'Not authorized'});
  }
  
})

app.get('/',(req,res)=>{
  res.send({'msg':'hello world'})
})
app.get('/accounts',(req,res)=>{//route function
  res.send({'msg':'accounts'})
})
app.get('/transactions',(req,res,next)=>{
  console.log("transactions inline middleware");
  next(new Error('oopps'));
},(req,res)=>{
  res.send({'msg':'transactions'})
})

app.use((error,req,res,next)=>{
  res.status(500).send(error);
})

app.listen(3000)