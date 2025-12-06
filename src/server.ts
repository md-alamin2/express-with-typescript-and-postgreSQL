import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { usersRoute } from './modules/user/user.routes';

const app = express();
const port = config.port;

// middle ware
app.use(express.json())



// initializing DB
initDB();

app.get('/', logger, (req: Request, res: Response) => {
    res.send('hello next level development')
})

// user crud

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`)

        res.status(200).json({
            success: true,
            message: 'Get users data',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// get single user
app.use("/users", usersRoute)
// app.get('/users/:id', async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "user fetched successfully",
//                 data: result.rows[0]
//             })
//         }

//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// })

// user post api
app.use("/users", usersRoute)

//     const { name, email } = req.body;
//     try {
//         const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email])

//         // console.log(result.rows[0])
//         // res.send({message:'data inserted successfully'})

//         res.status(201).json({
//             success: true,
//             message: 'Data Inserted',
//             data: result.rows[0]
//         })

//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// })

// user update api
app.put('/users/:id', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "user updated successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// user delete api
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id])
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "user deleted successfully",
                data: result.rows
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// todos crud

app.get('/todos', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos`)

        res.status(200).json({
            success: true,
            message: 'Get todos data',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// get single todo
app.get('/todos/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'todo not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "todo fetched successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


app.post('/todos', async(req: Request, res: Response)=>{
    const {user_id, title}= req.body;

    try{
        const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title])

        res.status(201).json({
            success: true,
            message: "Todo added successfully",
            data: result.rows[0]
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
})

// todo update api
app.put('/todos/:id', async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await pool.query(`UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`, [title, req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'todo not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "todo updated successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// todo delete api
app.delete('/todos/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [req.params.id])
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'todo not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "todo deleted successfully",
                data: result.rows
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.use((req, res)=>{
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})