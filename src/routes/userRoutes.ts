import { authenticateUser, returnJwtData, addNewUser } from './../controllers/authController';
import { Router, Request, Response } from "express";
import { verifyJwtToken } from '../middlewares/verifyJwtToken';

const userRoutes = Router();

userRoutes.post("/auth/authenticate-user", authenticateUser)

userRoutes.get("/auth/validate-token", verifyJwtToken)

userRoutes.get("/auth/teste", verifyJwtToken, returnJwtData)

userRoutes.post("/auth/add-user", addNewUser)

export default userRoutes;