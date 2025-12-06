import { Request, Response, Router } from "express";
import { pool } from "../../config/db";

const router = Router();


// router -> controller -> service 
router.post('/',  async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email])

        // console.log(result.rows[0])
        // res.send({message:'data inserted successfully'})

        res.status(201).json({
            success: true,
            message: 'Data Inserted',
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/',  async (req: Request, res: Response) => {
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


export const usersRoute = router;