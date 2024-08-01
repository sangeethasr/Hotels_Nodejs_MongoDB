
const mongoose = require("mongoose")

//Define mongo db connection url

const mongoURL = 'mongodb://localhost:27017/hotels';

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
