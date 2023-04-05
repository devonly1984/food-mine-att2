import {connect,ConnectOptions} from 'mongoose';

const dbConnect = ()=>{
    connect(process.env.MONGODB_URI!,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }as ConnectOptions);
    console.log("MongoDB Connected")
}
export default dbConnect;