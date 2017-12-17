const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017/edxCourseDb'
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

mongodb.MongoClient.connect(url,(error,db)=>{
  if(error) return process.exit(1);

  app.get('/accounts',(req,res)=>{
    db.collection('accounts')
    .find({},{sort:{_id:-1}})
    .toArray((error,accounts)=>{
      if(error) return next(error);
      res.send(accounts);
    })
  })

  app.get('/accounts/:id',(req,res)=>{
    db.collection('accounts')
    .find({_id:mongodb.ObjectID(req.params.id)},{sort:{_id:-1}})
    .toArray((error,accounts)=>{
      if(error) return next(error);
      res.send(accounts);
    })
  })

  app.post('/accounts',(req,res)=>{
    let newAccount = req.body;
    db.collection('accounts').insert(newAccount,(error,results)=>{
      if(error) return next(error)
      res.send(results)
    })
  })

  app.put('/accounts/:id',(req,res)=>{
    db.collection('accounts')
    .update({_id:mongodb.ObjectID(req.params.id)},
      {$set:req.body},
      (error,results)=>{
        if(error) return next(error)
        res.send(results)
      }
    )
  })

  app.delete('/accounts/:id',(req,res)=>{
    db.collection('accounts')
    .remove({_id:mongodb.ObjectID(req.params.id)},(error,results)=>{
      if(error) return next(eror)
      res.send(results)
    })
  })
  app.use(errorhandler());
  app.listen(3000)
})
/* 
curl -H "Content-Type: application/json" -X POST -d '{"balance": 100, "name":"checking"}'  "http://localhost:3000/accounts" 
curl -H 'Content-Type: application/json' -X PUT -d '{"balance": 200, "name": "savings"}'  "http://localhost:3000/accounts/{ID}" 
curl "http://localhost:3000/accounts" 
curl -X DELETE "http://localhost:3000/accounts/{ID}"
*/