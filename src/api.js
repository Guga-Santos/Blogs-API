const express = require('express');
const errorMiddleWare = require('./middlewares/errorMiddleWare');

// ...

const app = express();

app.use(express.json());
// 
app.use(errorMiddleWare);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
