const fs = require('fs');
const path = require('path');
const csv = require('../node_modules/csvtojson');

const csvToJson = (csvFilePath='customer-data.csv',jsonFilePath='customer-data2.json') =>{
  console.log('converting:',csvFilePath,' to ',jsonFilePath);
  let output = [];
  csv().fromFile(path.join(__dirname,csvFilePath)).on('json',(jsonObj)=>{
    output.push(jsonObj);
  }).on('end',(error)=>{
    if(error) return console,error(error);
    fs.writeFile(path.join(__dirname,jsonFilePath),JSON.stringify(output,null,2),(error)=>{//JSON.stringify格式美化
      if(error) return console.error(error);
      console.log("Writing is done.");
    })
  }).on('error',()=>{
    console.error(`Got error: ${error.message}`);
  })
}
csvToJson(process.argv[2],process.argv[3]);