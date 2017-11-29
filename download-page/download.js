const http = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const downloadPage = (url)=>{
  http.get(url,(res)=>{
    let rawData = '';
    res.on('data',(chunk)=>{
      rawData += chunk;
    })
    res.on('end',()=>{
      fs.writeFile('./data/'+ uuid.v1() +'.html',rawData,(error)=>{
        if(error) console.error(error);
        console.log("writing done!")
      })
    })
    res.on('error',(error)=>{
      console.log(`Got error:${error.message}`);
    })
  }).on('error',(error)=>{
    console.log(`Got err:${error.message}`);
  })
}
downloadPage(process.argv[2])