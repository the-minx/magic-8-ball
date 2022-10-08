# Magic-8-Ball

## Authors: Stephanie Hill, Mary Kariuki

Using socket.io our server allows clients seeking the wisdom of the Magic Eight Ball to connect and find answers to the questions haunting their hearts.

The app will randomly generate questions from an array, and elicit randomly generated responses from the eightball via a shared namespace where events are passed and trigger a chain of questions and answers.

If the questions are stopped, the unanswered questions in the queue will be stored and delivered upon the client's return.

![UML for our project](./assets/Magic%20Eight%20Ball.png)

Running the app locally

Clone the repository to your local machine

run the following commands in your terminal:

`npm install`

- to run the application using your console and opening three different windows:

  - in first open and access at root level with command `node hub.js`
  - in second open fortuneSeeker folder and run command `node index.js`
  - in third open fortuneTeller folder and run command `node eightBall.js`

responses should begin to list in each separate terminal window
