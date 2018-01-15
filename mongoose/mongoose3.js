
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test3",{useMongoClient:true});

const bookSchema = mongoose.Schema({name:String});

bookSchema.method({//document method(instance method)
  buy(quantity,customer,callback){
    var bookToPurchase = this;
    console.log("buy");
    return callback();
  },//es6写法
  refund(customer,callback){
    console.log("refund");
    return callback();
  }
});

bookSchema.static({//model method(static method)
  getZeroInventoryReport(callback){
    console.log("getZeroInventoryReport");
    let books = [];
    callback(books);
  },
  getCountById(bookId,callback){
    console.log("getCountById");
    let count = 0;
    callback(count);
  }
});

bookSchema.pre("save",function(next){//save前执行
  console.log("pre save");
  return next();
});
bookSchema.pre("remove",function(next){//remove前执行，pre必须放在mongoose.model之前
  console.log("pre remove");
  return next();
});

let Book = mongoose.model("Book",bookSchema);
Book.getZeroInventoryReport(()=>{});
Book.getCountById("1",()=>{});

let myBook = new Book({name:"Call Of Cthulhu"});
myBook.buy(10,"1",()=>{});
myBook.refund("1",()=>{});


myBook.save((error,results)=>{
  if(error){
    console.error(error);
    process.exit(1);
  }else{
    console.log("saved",results);
    myBook.remove((error,results)=>{
      if(error){
        console.error(error);
        process.exit(1);
      }else{
        process.exit(0);
      }
    })
  }
})