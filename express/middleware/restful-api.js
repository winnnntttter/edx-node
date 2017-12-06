const express = require('../../node_modules/express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let profile = {
  username:'asdf',
  email:'[reducted]',
  url:'http://aaa.com'
} 

app.get('/profile',(req,res)=>{
  res.send(profile); 
})

app.post('/profile',(req,res)=>{
  profile = req.body
  console.log('created',profile);
  res.sendStatus(201);
})

app.put('/profile',(req,res)=>{
  Object.assign(profile,req.body)
  console.log('updated',profile)
  res.sendStatus(204);
})

app.delete('/profile',(req,res)=>{
  profile = {}
  console.log('deleted',profile)
  res.sendStatus(204)
})

app.listen(3000)