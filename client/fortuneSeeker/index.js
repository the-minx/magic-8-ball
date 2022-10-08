'use strict';

const ClientClass = require('../lib/clientClass');
const client = new ClientClass('Eight Ball');
const Chance = require('chance');
const chance = new Chance();

client.subscribe('RESPONSE', (payload) => {
  console.log(`Tell me...${payload.question} Eight Ball says ${payload.response}`);
  client.publish('RECEIVED', payload);
});

client.publish('GET_ALL', {queueId: 'Eight Ball'});

function askEightBall() {
  const questions = ['Does my crush like me?', 'Is my partner going to break up with me?', 'Do my parents love me?', 'Should I break up with my partner?','Am I going to survive Code Fellows?', 'Should I buy it?','Will I win the lottery this year?','Will my jeans ever become loose on me?','Will the Magic 8 Ball end up in the trash if it does not give me the answer I want?'];
  const question = questions[Math.floor(Math.random() * questions.length)];
  console.log('Tell me...', question);
  client.publish('ASK', {question, messageId: chance.guid()});
}

setInterval(() => {
  askEightBall();
}, 5000);