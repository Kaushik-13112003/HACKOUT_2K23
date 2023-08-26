const mongoose = require('mongoose')
const DB = process.env.DB;

mongoose.connect(DB).then(() => {
    console.log("Database Connected Succesfully")
}).catch(() => {
    console.log("Database Not Connected")
})