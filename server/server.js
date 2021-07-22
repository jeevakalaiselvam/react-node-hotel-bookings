import express from 'express';
import dotenv from 'dotenv';
import { readdirSync } from 'fs';
//Load all environment variables
require('dotenv').config();

const app = express();

//Routing trick for bring in everything in routes folder
readdirSync('./routes').map((route) => {
  app.use('/api', require(`./routes/${route}`));
});

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Listening on port 8000 ✅`);
});
