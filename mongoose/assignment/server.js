const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx-rest-api', {useMongoClient: true});

let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

const Account = mongoose.model('Account',
  {
    name: String,
    balance: Number
  }
);

app.get('/accounts', (req, res) => {
  Account.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log('Account Listed\n', doc);
      res.status(200).send(`Account Listed\n  ${doc}`);
    }
  });
});

app.post('/accounts', (req, res) => {
  let newAccount = new Account(req.body);
  newAccount.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Account is saved: ', newAccount.toJSON());
      res.status(201).send({id: newAccount._id});
    }
  });
});

app.put('/accounts/:id', (req, res) => {
  Account.findByIdAndUpdate(req.params.id, req.body,{new: true}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log('Account is updated: ', doc);
      res.status(200).send(`Account is updated:\n  ${doc}`);
    }
  });
});

app.delete('/accounts/:id', (req,res) => {
  Account.findByIdAndRemove(req.params.id, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log('Account is deleted: ', doc);
      res.status(204).send(`Account is deleted:\n ${doc}`);
    }
  });
});

app.listen(3000);
