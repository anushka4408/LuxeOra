const mongoose=require('mongoose');
const colors=require('colors');
const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`CONNECTED TO MONGODB: ${conn.connection.host}`.bgBlack.green);
    }catch(error){
        console.log(`ERROR IN MONGODB: ${error}`.bgBlack.red);
    }
};
module.exports = connectDB;
