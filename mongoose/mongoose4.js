var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/test4",{useMongoClient:true});

const bookSchema = mongoose.Schema({
  name:String,
  author:String,
  published:Boolean,
  createdAt:Date,
  updateAt:{type:Date,default:Date.now()},
  email:String,
  reviews:[mongoose.Schema.Types.Mixed]
});

//虚拟字段
bookSchema.virtual("authorPhotoUrl").get(function(){//不能使用箭头函数，否则该函数会在myBook.save执行后才执行
  if(!this.email) return null;
  var crypto = require("crypto");
  email = this.email;
  email = email.trim();
  email = email.toLowerCase();
  var hash = crypto.createHash("md5").update(email).digest("hex");
  var baseUrl = "https://s.gravatar.com/avatar/";
  var para = "?s=800";
  return baseUrl + hash + para;
});
bookSchema.virtual("virtualField").get(function(){
  if(!this.name || !this.author) return null;
  return this.name + ":" + this.author;
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
    console.log(`virtual field:${myBook.virtualField}`);
    myBook.remove(process.exit);
  }
});