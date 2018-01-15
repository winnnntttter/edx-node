const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test2",{useMongoClient: true});

let Book = mongoose.model("Book",{
  name:String,
  published:Boolean,
  createdAt:Date,
  updatedAt:{type:Date,default:Date.now()}
})

let myBook = new Book({
  name:"call of cthulhu",
  author:"H.P.L",
  createdAt:Date.now(),
  link:"http://aaa.ccc"
})

console.log("isNew?",myBook.isNew);
myBook.save((err,results)=>{
  if(err){
    console.error(err);
    process.exit(1);
  }
  else{
    console.log("saved:",results);
    console.log("isNew?",myBook.isNew);
    Book.findOne({_id:myBook.id},"name",(error,bookDec)=>{//加参数name，只显示bookDec的name字段和id
      if(error){
        console.error(error);
        process.exit(1);
      }else{
        console.log(bookDec.toJSON());
        console.log(bookDec.id);
        bookDec.published=true;
        //bookDec.save(console.log);
        bookDec.remove(process.exit);
      }
    })
  }
})