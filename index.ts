import express, { json } from 'express'
const dotenv = require('dotenv');
import cors from 'cors'
import { NextFunction, Request, Response } from 'express'
import { getCompletion } from './src/controllers/completion/completion';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors())
app.use(json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req: any, res: any) => {
  res.send('Express + TypeScript Server');
});

app.post('/translate-with-explanation', (req: Request, res: Response, next: NextFunction) => {
  getCompletion(req, res, next)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});