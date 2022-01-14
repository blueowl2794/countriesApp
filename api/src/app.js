const express = require('express'); //framework diseñado para crear aplicaciones web y APIS
const cookieParser = require('cookie-parser');//Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
//const bodyParser = require('body-parser'); desvalorizada--Middleware de análisis del cuerpo de Node.js.
const morgan = require('morgan');//Middleware del registrador de solicitudes HTTP para node.js//Concise output colored by response status for development use. The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes. 
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));//urlencoded: Devuelve middleware que solo analiza cuerpos codificados en URL y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo
server.use(express.json({ limit: '50mb' }));//json: Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
server.use(cookieParser());
server.use(morgan('dev'));//Usar una cadena de formato predefinida
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3002'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/api', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
