const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');

const helmet = require('helmet');
const morgan = require('morgan');

const express = require('express');
const app = express();

const home = require('./routes/home');
const products = require('./routes/products');

// Setting the env: 
// export NODE_ENV=development this matches the json configuration file name
// export app_password=123, json property matches the mail.password
// Configuration
console.log('Application ', config.get('name'));
console.log('Mail server ', config.get('mail.host'));
console.log('Mail password ', config.get('mail.password'));

// Middleware functions run in sequence
app.use(express.json()); // This is a built-in middleware function, populate json request
app.use(express.static('static-content'));
app.use(helmet());       // Secure your Express apps by setting various HTTP headers

app.use('/', home);
app.use('/api/products', products); // Highlight this - Use router to structure our code


console.log('Enviroment ', app.get('env'));
if (app.get('env') == 'development') {
    app.use(morgan('tiny')); // logging with tiny simple format
    startupDebugger('Mogan enabled.......................'); // works only if export DEBUG=app:startup
}

dbDebugger('Connected to db .....');    // works if export DEBUG=app:db (or export DEBUG=app:*)

// Custom middleware function
app.use((req, res, next) => {
    console.log('Logging middleware');
    next();
});

app.use((req, res, next) => {
    console.log('Authentication...');
    next();
});
// End middleware functions

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on: ${port}`));
