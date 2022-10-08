'use strict';

const ClientClass = require('../lib/clientClass');
const eightBall = new ClientClass('Eight Ball');

function eightBallResponse(payload) {
  const responses = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Do not count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
  const response = responses[Math.floor(Math.random() * responses.length)];
  console.log('eight ball response', response);
  eightBall.publish('RESPONSE', { response, ...payload });
}

eightBall.subscribe('ASK', (payload) => {
  setTimeout(() => {
    eightBallResponse(payload);
  }, 15000);

});