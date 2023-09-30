import { authenticateUser, returnJwtData, addNewUser } from './../controllers/authController';
import { Router, Request, Response } from "express";
import { verifyJwtToken } from '../middlewares/verifyJwtToken';

const userRoutes = Router();

userRoutes.post("/authenticate-user", authenticateUser)

userRoutes.get("/validate-token", verifyJwtToken)

userRoutes.get("/teste", verifyJwtToken, returnJwtData)

userRoutes.post("/add/user", addNewUser)

export default userRoutes;