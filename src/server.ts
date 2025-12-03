import express, { Request, Response } from 'express';
import { Pool } from 'pg'

const app = express();
const port = 5000;
const pool = new Pool({
    connectionString:
        `postgresql://neondb_owner:npg_GVLbyIj8B4DM@ep-shy-lab-ahylhfl2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
})

// middle ware
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('hello next level development')
})

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);

    res.status(201).send({
        success: true,
        message: 'Api is working'
    })
})

app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})