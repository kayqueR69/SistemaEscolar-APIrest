import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import Dot from 'dotenv';
import { router } from './routes/routes.js';

Dot.config()

const app = express();

app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.use(router)

app.listen(3001, () => {console.log('Server rodando em ' + process.env.URL_API)})

