//npm install mongodb

const mongoose = require('mongoose')

const connectionsString = 'mongodb+srv://Sisi:DatabaseUser2024@cluster0.zd4bpix.mongodb.net/Task-Manager?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = (url) => {
    return mongoose
        .connect(connectionsString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to the DB...");
        })
        .catch(err => {
            console.error("Error: ", err);
        })
}

module.exports = connectDB 

