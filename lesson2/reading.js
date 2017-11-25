const fs = require('fs');
const path = require('path');

console.log(__dirname);
fs.readFile(path.join(__dirname,'/data/example.txt'),{encoding:'utf-8'},function(error,data){
  if(error) return console.error(error);
  console.log(data);
});