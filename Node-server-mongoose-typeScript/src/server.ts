import mongoose from 'mongoose';
import app from './app';

const port: number = 5000;
mongoose.connection.on("disconnected", () => { console.log("Disconnected") });

async function bootstrap() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.1ktuxvt.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`);
    console.log("Database connected!!")
  } catch (error) {
    console.log(error)
  }
}

app.listen(process.env.PORT || port, () => { bootstrap(); console.log("Node Server Started") })