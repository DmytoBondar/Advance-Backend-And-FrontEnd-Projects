import mongoose from "mongoose"
import config from "./config/index"
import app from "./app";


async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string)
        console.log("Database is connected successfully");

        app.listen(config.port || 5000, () => {
            console.log(`Application listening on port ${config.port}`)
        })
    } catch (err) {
        console.log("Faild to connect database", err)
    }
}
bootstrap();