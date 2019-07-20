const express = require('express');
const graphqlHandler = require('express-graphql');

const graphqlSchema = require('./graphql');

const app = express();

app.use('/query', graphqlHandler({
    schema: graphqlSchema
}));

app.listen(3000, () => console.log('Server started at http://localhost:3000'));