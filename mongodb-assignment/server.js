const mongodb = require('mongodb');
const fs = require('fs');
const addresses = require('./data/m3-customer-address-data.json');
const customers = require('./data/m3-customer-data.json');
const chunkSize = parseInt(process.argv[2],10);
const async = require('async');

if(!chunkSize){
  console.error(`Usage:${process.argv[0]} ${process.argv[1]} <chunk size>`)//Usage:C:\Program Files\nodejs\node.exe D:\nodejs\workspace\edx-node\mongodb-assignment\server.js <chunk size>
  process.exit(1);
}
const insertDocuments = (db,customers,addresses,done) => {
  const restoredCustomers = [];
  customers.forEach((element,index) => {
    restoredCustomers.push(Object.assign(element,addresses[index]));
  });
  db.collection('customers').insert(restoredCustomers,(error,result)=>{
    done(error,result);
  })
  console.log(restoredCustomers.length);
}

const updateCustomers = (db)=>{
  const updateTask = (obj)=>{
    console.log('updating',obj.customers.length)
  }
  let updateTasks = [];
  for(let i=0,j=customers.length;i<j;i+=chunkSize){
    let customersChunkedArray,addressesChunkedArray;
    customersChunkedArray = customers.slice(i,i+chunkSize);
    addressesChunkedArray = addresses.slice(i,i+chunkSize);
    updateTasks.push((done)=>{
      insertDocuments(db,customersChunkedArray,addressesChunkedArray,done)
    })
    //console.log(i)
  }
  const startTime = Date.now();
  //console.log(updateTasks.length)
  async.parallel(updateTasks,(error,result)=>{  //updateTasks is an array of functions and they will run all at the same time. When they are done, the callback will be executed
    if(error) console.error(error);
    db.close();
    console.log(`time:${Date.now() - startTime} milliseconds`);
  })
}

const url = 'mongodb://localhost:27017/mongoAssign';

mongodb.MongoClient.connect(url,(error,db)=>{
  if(error) return process.exit(1);
  db.dropCollection("customers", (err, result) => {
    updateCustomers(db)
  })
})