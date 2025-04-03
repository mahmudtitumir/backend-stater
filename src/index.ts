import express from 'express';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import router from './router';
const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8081, () => {
    console.log(`Server running at http://localhost:8080`);
});

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
