import { connect, ConnectOptions } from "mongoose";

const dbConnect = () => {
  connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    () => {
      console.log("MongoDB Connected");
    },
    (error) => {
      console.log(error);
    }
  );
};
export default dbConnect;
