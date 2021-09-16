//Require all that's needed to power this App
//adding a few documentation
import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import './config/dbconnection';
let cors = require('cors');
import methodOverride from 'method-override';
import dotenv from 'dotenv';
const app = express();
app.use(cors());

//=========================================================
//All Middlewares here
//=========================================================
// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '400mb' }));
app.use(expressValidator());
app.use(methodOverride());

process.env.TZ = 'Africa/Lagos';

// Authentication Route
app.use('/v1/auth', require('./routes/v1/AuthRoute'));

// Blogs Route
app.use('/v1/blogs', require('./routes/v1/BlogRoute'));

// Users Route
app.use('/v1/users', require('./routes/v1/UserRoute'));

// Index Route
app.get('/', (req, res)=>{
  res.status(200).send(
    "<br/><center><h3>Gratis Backend Dev Assessment, Sept 2021</h3> <p>The Blog API Version 1.0</p></center>"
  );
})

//default landing:
app.all('*', (req, res) => {
  res.status(404).send({
    status: 'failed',
    status_code: 404,
    message: 'Resource not found',
  });
});

dotenv.config();

//=========================================================
//Running the server on Port 3000 default
let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

module.exports = app;
