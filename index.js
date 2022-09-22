
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import './utils/loadEnv.js';

import userRouter from "./routes/user.js";
import coinRouter from './routes/coin.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/coin', coinRouter);
app.use("/user", userRouter);
const CONNECTION_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/tosscoin-local';
const PORT = process.env.PORT|| 8080;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Server Running on Port: http://localhost:${PORT}`);
  }))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);