const jokes = require('give-me-a-joke');
const color = require('chalk-rainbow');

jokes.getRandomDadJoke(function (joke) {
    console.log(color(`Dad joke: ${joke}`));
})

jokes.getRandomCNJoke(function (jokeCN) {
    console.log(color(`Chucknorris joke: ${jokeCN}`));
})