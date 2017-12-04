const express = require('../../node_modules/express');//('express')也可以
const app = express();

app.get('/',(req,res)=>{
  res.send({'msg':'hello world'})
})
app.listen(3000)