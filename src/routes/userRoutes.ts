import { authenticateUser, returnJwtData, addNewUser, getUserData, deleteUserById } from './../controllers/authController';
import { Router, Request, Response } from "express";
import { verifyJwtToken } from '../middlewares/verifyJwtToken';

const userRoutes = Router();

userRoutes.post("/auth/authenticate-user", authenticateUser)

userRoutes.get("/auth/validate-token", verifyJwtToken)

userRoutes.get("/auth/teste", verifyJwtToken, returnJwtData)

userRoutes.post("/auth/add-user", addNewUser)

userRoutes.get("/user/get/:user_id", verifyJwtToken, getUserData)

userRoutes.delete("/user/delete/:user_id", verifyJwtToken, deleteUserById)

export default userRoutes;