import express, {Application} from 'express';
import cors from 'cors';
import userRoutes from './app/modules/user/user.route';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something Went Wrong!';
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack: err.statck
    })
})

export default app;