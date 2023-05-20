import mongoose from 'mongoose';
import app from './app';

const port: number = 5000;
mongoose.connection.on("disconnected", () => { console.log("Disconnected") });


async function bootstrap() {
  try {
    await mongoose.connect('mongodb+srv://ujjalzaman:55YaemVn6GHDukvH@cluster0.1ktuxvt.mongodb.net/explore-mongoose?retryWrites=true&w=majority');
    console.log("Database connected!!")
  } catch (error) {
    console.log(error)
  }
}

app.listen(process.env.PORT || port, () => { bootstrap(); console.log("Node Server Started") })