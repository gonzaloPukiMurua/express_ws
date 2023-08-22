const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const sockets = require('./sockets');
app.set('io', io);

const port = 3000;
app.set('port', process.env.PORT || port);
app.set('host', process.env.HOST || '192.168.0.141');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./src/lib/helpers')
}));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'src')));
app.use(express.static(path.resolve(__dirname, 'views')));

sockets(io);

app.use('/api',require(path.resolve(__dirname,'routes/api')));

server.listen(app.get('port'), app.get('host'),() => {
    console.log(`Server is in port ${app.get('port')}`);
});
