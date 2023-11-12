const express = require ('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//express server
const app = express();

//ddbb
dbConnection();

//public directory
app.use(express.static('public'));

//CORS
app.use(cors());

//body parser
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/project', require('./routes/project.routes'));

//port
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});

