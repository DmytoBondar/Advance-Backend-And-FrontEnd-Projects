import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import booksRoutes from './app/modules/books/book.route';
const app: Application = express();
dotenv.config();
//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1/book", bookRoute);
app.get("/", (req: Request, res: Response) => {
    res.send("Database has been working");
});
app.use('/api/v1/books', booksRoutes)

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong !!";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        statck: err.stack,
    })
})
export default app;