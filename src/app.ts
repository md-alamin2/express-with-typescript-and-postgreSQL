import express, { NextFunction, Request, Response } from 'express';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { usersRoute } from './modules/user/user.routes';
import { todosRouter } from './modules/todo/todo.routes';
import { authRoutes } from './modules/Auth/auth.routes';

const app = express();


// middle ware
app.use(express.json())



// initializing DB
initDB();

app.get('/', logger, (req: Request, res: Response) => {
    res.send('hello next level development')
})

// user crud
app.use("/users", usersRoute)

// todos crud
app.use("/todos", todosRouter)

// auth routes
app.use("/auth", authRoutes)

app.use((req, res)=>{
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

export default app;