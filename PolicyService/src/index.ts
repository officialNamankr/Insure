import { configuedApp } from "./app"
import mongoose from "mongoose";

const start = async () => {
    if (!process.env.INSURE_JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
      }
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
      }
      try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDb");

      } catch (err) {
        console.error(err);
      }

}
configuedApp.listen(3000, () => {
    console.log("Listening on port 3000");
});
start();