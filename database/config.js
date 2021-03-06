
const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        });

        console.log('BD online Clusters mongodb Atlas :: https://cloud.mongodb.com/');

    } catch (error) {
        console.log(error);
        throw new Error('Error connection DB');
    }
}

module.exports = {
    dbConnection
}