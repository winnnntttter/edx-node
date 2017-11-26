var Job = require('./job.js');
var job = new Job();

job.on("done",function(details){
  console.log("job was completed at",details.completeOn);
  //job.removeAllListeners();
})
job.emit("start");