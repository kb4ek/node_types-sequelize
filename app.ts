import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import { connect } from './database/index';

import index from './routes/index';


dotenv.config();

connect(true, true).then(() => console.log("데이터베이스 연결 성공"));

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/index', index)

app.use((req, res, next) => {
  // err.status = 404;
  return next(new Error("Not Found"));
})


export default app;
