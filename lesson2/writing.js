const fs = require('fs');
const path = require('path');

fs.writeFile('./data/message.txt','Hello,World!',function(error){
  if(error) console.error(error);
  console.log("Writing is done.");
})