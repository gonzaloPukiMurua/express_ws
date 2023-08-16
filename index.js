const path = require("path");
const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const expressWS = require('express-ws')(app);

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
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'src')));
app.use(express.static(path.resolve(__dirname, 'views')));

app.use('/api',require(path.resolve(__dirname,'routes/api')));

app.listen(app.get('port'), '192.168.0.102',() => {
    console.log(`Server is in port ${app.get('port')}`);
});
