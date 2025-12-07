import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async(req: Request, res: Response)=>{
    const {user_id, title}= req.body;

    try{
        const result = await todoServices.createTodo(user_id, title)

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
}

const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo()

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
}

const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getSingleTodo(req.params.id as string);

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
}

const updateTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await todoServices.updateTodo(title, req.params.id as string);

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
}


const deleteTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.deleteTodo(req.params.id as string);

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
}

export const todoControllers = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
}