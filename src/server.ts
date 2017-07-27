/**
 * Dependencies
 */
 import * as path from 'path';
 import * as dotenv from 'dotenv';
 import * as express from 'express';
 import * as compression from 'compression';
 import * as logger from 'morgan';
 import * as bodyParser from 'body-parser';
 import * as expressValidator from 'express-validator';
 import * as errorHandler from 'errorhandler';


 /**
  * Route Imports
  */
import { apiRouter } from './routes';

 
 /**
  * Load environment variables from .env file.
  */
dotenv.config({ path: '.env' });


/**
 * Create and configure Express server.
 */
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


/**
 * App Routes
 */
app.get('/', (req, res, next) => {
    res.send('Hello World.');
});

app.use('/api', apiRouter);


/**
 * Error Handler. Disabled for production.
 */
if (process.env.ENV === 'dev'){
    app.use(errorHandler());
}


/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(`Server running on localhost:${app.get('port')} ${app.get('env')}`);
});

module.exports = app;