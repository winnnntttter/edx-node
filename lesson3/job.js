//import { setTimeout } from 'timers';

const eventEmitter = require('events');

class Job extends eventEmitter{
  constructor(ops){
    super(ops);
    this.on("start",()=>{
      this.process();
    })
  }
  process(){
    setTimeout(()=>{
      //Emulate the delay of the job -async!
      this.emit("done",{completeOn:new Date()})
    },700)
  }
}

module.exports= Job;