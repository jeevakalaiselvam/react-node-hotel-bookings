import express from 'express';
import { readdirSync } from 'fs';

const app = express();

//Routing trick for bring in everything in routes folder
readdirSync('./routes').map((route) => {
  app.use('/api', require(`./routes/${route}`));
});

app.listen(8000, () => {
  console.log(`Listening on port 8000 ✅`);
});
