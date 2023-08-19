const path = require("path");
const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;
app.set('port', process.env.PORT || port);
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./src/lib/helpers')
}));
app.set('view engine', '.hbs');
app.set('socketio', io);
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'src')));
app.use(express.static(path.resolve(__dirname, 'views')));

let idResultado = '';
let indiceSorteo = 0;
let indiceGanadores = 0;
let indiceLicitaciones = 0;
io.on('connection',(socket) => {
 
  console.log('a user connected');
  socket.on('disconnect', () => {
  
  });
  socket.on('id', (msg) => {
    idResultado = msg;
    console.log('Usuario de "Resultados": ', idResultado);
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    if(msg === 'Siguiente valor'){
      indiceSorteo += 1;
      console.log('Valor de indice de listado de sorteo: ', indiceSorteo);
      console.log('Enviando a: ', idResultado);
      socket.to(idResultado).emit('next', indiceSorteo);
    }
  });
});

app.use('/api',require(path.resolve(__dirname,'routes/api')));

server.listen(app.get('port'), '192.168.0.102',() => {
    console.log(`Server is in port ${app.get('port')}`);
});
