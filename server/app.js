const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require("express");
const numberRoutes = require('./routes/numbers')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api/numbers',numberRoutes);

app.listen(process.env.PORT,() =>{
    console.log("Server started at",process.env.PORT);   
});
