import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';

import controlRoutes from './routes/control.routes.js';
import resultsRoutes from './routes/results.routes.js';
import dataLoadRoutes from './routes/dataLoad.routes.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
app.set('port', process.env.PORT || port);
app.set('host', process.env.HOST || '192.168.0.141'); // <- Colocar IP local
app.set("views", join(__dirname, "views"));

const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(join(__dirname, "public")));

app.use(controlRoutes);
app.use(resultsRoutes);
app.use(dataLoadRoutes);

export default app;