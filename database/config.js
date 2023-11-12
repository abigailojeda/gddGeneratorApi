const { default: mongoose } = require('mongoose');
const mngoose = require('mongoose')

const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.BD_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log('database connected')
        
    } catch (error) {
        console.log(error);
        throw new Error('database connection error');
        
    }
}

module.exports = {
    dbConnection
}