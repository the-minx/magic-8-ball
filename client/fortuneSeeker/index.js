'use strict';

const ClientClass = require('../lib/clientClass');
const client = new ClientClass('Fortune Seeker');

client.subscribe('RESPONSE', (payload) => {
  console.log();
  client.publish('RECEIVED', payload);
});

function askEightBall() {
  const questions = ['Does my crush like me?', 'Is my partner going to break up with me?', 'Do my parents love me?', 'Should I break up with my partner?', 'Am I gay?', 'Should I buy it?'];
  const question = questions[Math.floor(Math.random() * questions.length)];
  console.log('Tell me...', question);
  client.publish('ASK');
}

setInterval(() => {
  askEightBall();
}, 5000);