const express = require('express');
require('express-async-errors');
const errorMiddleWare = require('./middlewares/errorMiddleWare');
const login = require('./routes/loginRoute');

// ...

const app = express();

app.use(express.json());
// 
app.use('/login', login);
app.use(errorMiddleWare);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
