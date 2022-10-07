'use strict';

const {Server} = require ('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const server = new Server(PORT);
const fortuneQueue = new Queue();

const fortunes = server.of('/fortunes');

server.on('connection',(socket)=>{
  console.log('socket is connected to hub',socket.id);
});

fortunes.on ('connection', (socket)=>{
  console.log ('connected to namespace', socket.id);

  socket.onAny((event, payload) => {
    // const date = new Date();
    // const time = date.toTimeString();
    console.log('EVENT', {event, payload});
  });

  socket.on('JOIN', (queueId) => {
    console.log(`Joined the ${queueId} room!`);
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });
  socket.on ('ASK',(payload)=>{
    let currentQueue = fortuneQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = fortuneQueue.store(payload.queueId, new Queue());
      currentQueue = fortuneQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId,payload);
    fortunes.emit('ASK',payload);
  });

  socket.on('RESPONSE',(payload)=>{
    let currentQueue = fortuneQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue Created');
    }
    let fortune = currentQueue.store(payload.messageId);
    fortunes.emit('RESPONSE',payload);
    socket.to(payload.queueId).emit('RESPONSE', fortune);

  });  

  socket.on('RECEIVED',(payload)=>{
    let currentQueue = fortuneQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue Created');
    }
    let fortune = currentQueue.remove(payload.messageId);
    fortunes.emit('RECEIVED',payload);
    socket.to(payload.queueId).emit('RECEIVED', fortune);

  });

  socket.on('GET_ALL', (payload) => {
    console.log('Fortunes Told');
    let currentQueue = fortuneQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('FORTUNE', currentQueue.read(messageId));
      });
    }
  });
  
});