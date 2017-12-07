const express = require('../../node_modules/express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let profile = [{
  username:'asdf',
  email:'[reducted]',
  url:'http://aaa.com'
}]

app.get('/profile',(req,res)=>{
  if(req.query.id) return res.send(profile[req.query.id])
  res.send(profile); 
})

app.post('/profile',(req,res)=>{
  profile.push(req.body);
  console.log('created',profile);
  res.sendStatus(201);
})

app.put('/profile/:id',(req,res)=>{
  Object.assign(profile[req.params.id],req.body)
  console.log('updated',profile[req.params.id])
  res.sendStatus(204);
})

app.delete('/profile/:id',(req,res)=>{
  profile.splice(req.params.id,1)
  console.log('deleted',profile)
  res.sendStatus(204)
})

app.listen(3000)