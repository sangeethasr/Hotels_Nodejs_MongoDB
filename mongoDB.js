
const mongoose = require("mongoose")
require('dotenv').config();

//Define mongo db connection url

// const mongoURL = process.env.MONGODB_URL_LOCAL; //local database

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("MongoDB Connected")
})

db.on('error', (err)=>{
    console.error("MongoDB connection error", err)
})

db.on('disconnected', ()=>{
    console.log("MongoDB disconnected")
})

module.exports = db;
