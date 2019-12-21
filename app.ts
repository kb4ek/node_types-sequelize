import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import { connect } from './database/index';

import api from './routes/api';


dotenv.config();

connect(false, true).then(() => console.log("데이터베이스 연결 성공"));

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api', api)

app.use((req, res, next) => {
  // err.status = 404;
  return next(new Error("Not Found"));
})


export default app;
