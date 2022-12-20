import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import express from "express"
import mongoose from "mongoose"
import Cors from 'cors'
require('dotenv').config()

import router from './routes/mainRoutes.js';



//App config
const app = express();
const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://${username}:${password}@cluster0.k99et64.mongodb.net/tinder_db?retryWrites=true&w=majority`


// middlewares
app.use(express.json())
app.use(Cors())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// DB config
mongoose.set("strictQuery", false);
mongoose.connect(connection_url)
  .then(() => {
    // listener
    app.listen(port, () => console.log(`listening on localhost: ${port}`))
  })
  .catch((error) => {
    console.log(error)
  })

// API endpoints
app.use('/api/main', router)


