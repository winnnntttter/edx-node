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
})