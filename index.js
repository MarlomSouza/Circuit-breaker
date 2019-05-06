const express = require('express');
const { setupCircuitBreaker } = require("./setupCircuitBreaker");

const app = express();
const circuit = setupCircuitBreaker();


const port = process.env.PORT || 3100;

app.get('/disponibilidade', (req, res) => {
  res.send('hello world');
});


app.use('/', (request, response) => {
    circuit.fire().then(result => {
        response.send(result);
    }).catch(err => {
        response.send(err.message);
    });
});


app.listen(port, () => console.log(`Escutando porta ${port}`));