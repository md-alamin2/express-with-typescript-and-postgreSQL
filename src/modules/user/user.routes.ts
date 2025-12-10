import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();


// router -> controller -> service 
router.post('/',  userControllers.createUser);

router.get('/', auth("admin"), userControllers.getUser);

router.get('/:id',  userControllers.getSingleUser);

router.put('/:id',  userControllers.updateUser);

router.delete('/:id',  userControllers.deleteUser);


export const usersRoute = router;
