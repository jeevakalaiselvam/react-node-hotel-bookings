import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { g } from './util/log';
const morgan = require('morgan');
//Load all environment variables
require('dotenv').config();

console.clear();
const app = express();

//Connection to Mongo
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    writeConcern: { j: true },
  })
  .then(() => g('MONGODB ATLAS CONNECTED ⭐️'))
  .catch((error) => r(`‼️ ERROR CONNECTING TO MONGODB ATLAS -> ${error}`));

//Add CORS to allow communication between different origins
g('APPLYING CORS');
app.use(cors());

//Add Morgan for logging
g('APPLYING MORGAN');
app.use(morgan('dev'));

//JSON body parsing, Use Express inbuilt or bodyparser

g('APPLYING JSON PARSER');
app.use(express.json());

//Routing trick for bring in everything in routes folder
g('USING ALL ROUTES DEFINED');
fs.readdirSync('./routes').map((route) => {
  app.use('/api', require(`./routes/${route}`));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  g(`LISTENING ON PORT ${port} ✅`);
});
