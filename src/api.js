const express = require('express');
require('express-async-errors');
const errorMiddleWare = require('./middlewares/errorMiddleWare');
const login = require('./routes/loginRoute');
const User = require('./routes/userRoute');
const Categories = require('./routes/categoryRoute');
const BlogPost = require('./routes/postRoute');

// ...

const app = express();

app.use(express.json());
// 
app.use('/login', login);
app.use('/user', User);
app.use('/categories', Categories);
app.use('/post', BlogPost);
app.use(errorMiddleWare);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
