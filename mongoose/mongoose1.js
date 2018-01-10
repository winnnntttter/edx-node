const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test2");

/* let Book = mongoose.model('Book', {name:String});
let mybook = new Book({name:'learn node third'});

mybook.save((err,results)=>{
  if(err) {
    console.error(err);
    process.exit(1);
  }else{
    console.log(results);
    process.exit(0);
  }
}) */
let Cook = mongoose.model('Cook', {name:String,price:Number});
let myCook = new Cook({name:'learn node third',price:5});

myCook.save((err,results)=>{
  if(err) {
    console.error(err);
    process.exit(1);
  }else{
    console.log(results);
    process.exit(0);
  }
})




const ObjectId = mongoose.Schema.Types.ObjectId,
  Mixed = mongoose.Schema.Types.Mixed
const postSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    set: function(slug) { 
      return slug.toLowerCase()
    }
  },
  numberOfLikes: {
    type: Number,
    get: function(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },  
  posted_at: { 
    type: String, 
    get: function(value) { 
      if (!value) return null;
      return value.toUTCString()
    }
  },  
  authorId: { 
    type: ObjectId, 
    default: function() { 
      return new mongoose.Types.ObjectId() 
    } 
  },
  email: { 
    type: String, 
    unique: true, 
    validate: [ 
      function(email) {
        return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:<a href="?:[a-z0-9-]*[a-z0-9]" title="" target="_blank">a-z0-9<\/a>?\.)+<a href="?:[a-z0-9-]*[a-z0-9]" title="" target="_blank">a-z0-9<\/a>?/i) != null)
      }, 
      'Invalid email'
    ] 
  }
})