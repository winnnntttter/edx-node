const http = require('http');
const url = 'http://nodeprogram.com';
http.get(url,(response)=>{
  let rawDate = '';
  let c = 0;
  response.on('data',(chunk)=>{
    rawDate+=chunk;
    c++;
  })
  response.on('end',()=>{
    console.log(rawDate,c);
  })
  response.on('error',(error)=>{
    console.error(`Got error:${error.message}`);
  })//域名没错，域名下目录有错会触发400错误？
}).on('error',(error)=>{
  console.log(`Got error:${error.message}`)
})//域名有错触发500错误？