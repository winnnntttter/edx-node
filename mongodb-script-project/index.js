const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/edx-course-db';
MongoClient.connect(url,(err,db)=>{
  if (err) return process.exit(1);
  console.log('Connection is okey');
  insertDocuments(db,()=>{
    updateDocuments(db,()=>{
      removeDocuments(db,()=>{
        findDocuments(db,()=>{
          db.close();
        })
      })
    })
  })
})

//创建
const insertDocuments = (db,callback) =>{
  const collection = db.collection('edx-course-students')

  collection.insert([
    {name:'bob'},{name:'john'},{name:'peter'}
  ],(err,result)=>{
    if(err) return process.exit(1);
    console.log(result);//result.result.n=3
    console.log(result.ops.length);//3
    console.log('Inserted 3 documents into the edx-course-students collection');
    callback(result);
  })
}
/* 
  { result: { ok: 1, n: 3 },
  ops:
   [ { name: 'bob', _id: 5a2fdb56aa56dae23c6bcc4a },
     { name: 'john', _id: 5a2fdb56aa56dae23c6bcc4b },
     { name: 'peter', _id: 5a2fdb56aa56dae23c6bcc4c } ],
  insertedCount: 3,
  insertedIds:
   [ 5a2fdb56aa56dae23c6bcc4a,
     5a2fdb56aa56dae23c6bcc4b,
     5a2fdb56aa56dae23c6bcc4c ] }
*/

//更新
const updateDocuments = (db,callback) =>{
  const collection = db.collection('edx-course-students');
  const name = 'peter2';
  collection.update({name:name},{$set:{grade:'A'}},(err,result)=>{
    if(err) return process.exit(1);
    console.log(result.result.n);//1 没有叫peter的则为0
    console.log(`Updated the student document where name = ${name}`)
    callback(result);
  })
}

//删除
const removeDocuments = (db,callback) =>{
  const collection = db.collection('edx-course-students');
  const name = 'bob';
  collection.remove({name:name},(err,result)=>{
    if(err) return process.exit(1);
    console.log(result.result.n);//
    console.log(`Removed document where name = ${name}`);
    callback(result);
  })
}

//查找 ，{}查找全部，放到最里层
var findDocuments = (db, callback) => {
  // Get the documents collection
  var collection = db.collection('edx-course-students')
  // Find some documents
  collection.find({}).toArray((error, docs) => {
    if (error) return process.exit(1)
    console.log(2, docs.length) // will be 2 because we removed one document
    console.log(`Found the following documents:`)
    console.dir(docs)
    callback(docs)
  })
}