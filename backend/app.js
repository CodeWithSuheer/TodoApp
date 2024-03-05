import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import path from 'path';
import { config } from "dotenv";
import express from 'express';
import cors from "cors";
import userRouter from './routes/userRoutes.js';
import goalRouter from './routes/goalsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

config({
    path: "./data/config.env"
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use('/api/v1/auth', userRouter);
app.use('/api/v1/goals', goalRouter);


// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve frontend
if (process.env.NODE_ENV === 'Production') {
    const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');

    app.use(express.static(frontendPath));

    app.get('*', (req, res) => res.sendFile(path.resolve(frontendPath, 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('Set to Production');
    })
}


app.use(errorHandler);



