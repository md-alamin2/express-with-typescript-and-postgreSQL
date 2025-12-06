import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = Router();


// router -> controller -> service 
router.post('/',  userControllers.createUser)

router.get('/',  userControllers.getUser)


export const usersRoute = router;