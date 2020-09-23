const mongoose = require('mongoose');
const config = require('config');


const connection = async () => {
    try {
        await mongoose.connect(
            config.get('mongoURI'),
            {
                useCreateIndex: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            }            
        )
        console.log("mongoDB connected!")
    } catch (error) {
        console.log(error)
        console.log("mongoDB connection failed!")
        process.exit(1)
    }
}

module.exports = connection;