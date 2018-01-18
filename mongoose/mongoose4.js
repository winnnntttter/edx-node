const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/test4",{useMongoClient:true});

const bookSchema = mongoose.Schema({
  name:String,
  published:Boolean,
  createdAt:Date,
  updateAt:{type:Date,default:Date.now()},
  email:String,
  reviews:[mongoose.Schema.Types.Mixed]
});

//虚拟document
bookSchema.virtual("authorPhotoUrl").get(function(){//不能使用箭头函数，否则该函数会在myBook.save执行后才执行
  console.log(this);
  if(!this.email) return null;
  var crypto = require("crypto");
  email = this.email;
  email = email.trim();
  email = email.toLowerCase();
  var hash = crypto.createHash("md5").update(email).digest("hex");
  var baseUrl = "https://secure.gravatar.com/avatar/";
  return baseUrl + hash;
});


let Book = mongoose.model("Book",bookSchema);
let myBook = new Book({
  name: "Call Of Cthulhu",
  author: "H.P.L",
  link: "http://aaaa.bbbb",
  email: "1013222027@qq.com",
  createdAt: Date.now()
});

myBook.save((err,results)=>{
  if(err){
    console.error(err);
    process.exit(1);
  }else{
    console.log(`saved: ${results}`);
    console.log(`Author photo: ${myBook.authorPhotoUrl}`);
    myBook.remove(process.exit);
  }
});