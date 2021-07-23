import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
//Load all environment variables
require('dotenv').config();

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
  .then(() => console.log('DB connected ⭐️'))
  .catch((error) => console.log(`‼️ Error connection to Mongo -> ${error}`));

//Add CORS to allow communication between different origins
app.use(cors());

//Add Morgan for logging
app.use(morgan('dev'));

//JSON body parsing, Use Express inbuilt or bodyparser
app.use(express.json());

//Routing trick for bring in everything in routes folder
fs.readdirSync('./routes').map((route) => {
  app.use('/api', require(`./routes/${route}`));
});

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Listening on port 8000 ✅`);
});
