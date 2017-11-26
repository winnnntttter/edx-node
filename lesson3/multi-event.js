const eventEmitter = require('events');

class Emitter extends eventEmitter{};

emitter = new Emitter();

emitter.on("knock",function(){
  console.log("Who\'s there");
});

emitter.on("knock",function(){
  console.log("Go Away");
});
emitter.once('knock', function() {
  console.log('Who\'s there? once')
});//只执行一次
emitter.emit("knock");
emitter.removeAllListeners();
emitter.emit("knock");