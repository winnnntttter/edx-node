
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname,'customer-data.csv'),{'encoding':'utf-8'},(error,data)=>{
  if(error) return console.error(error);
  const arr = data.toString('utf8').split(/[\r\n]/);
  const keys = arr[0].split(',');
  const resultArr = [];
  for(let i = 1;i<arr.length;i++){
    let objTemp = {};
    let arrTemp = arr[i].split(',');
    for(let j = 0;j<keys.length;j++){
      if(arrTemp[j]){
        objTemp[keys[j]] = arrTemp[j];
      }else{
        objTemp[keys[j]] = '';
      }
    }
    resultArr.push(objTemp);
  }
  const resultString = JSON.stringify(resultArr).replace(/{/g,'\n\t{\n\t').replace(/,/g,',\n\t').replace(']','\n]').replace('\n\t\n','\n').replace(/}/g,'\n\t}')
  fs.writeFile(path.join(__dirname,'customer-data.json'),resultString,'utf8',function(error){
    if(error) console.error(error);
    console.log("Writing is done.");
  })
})