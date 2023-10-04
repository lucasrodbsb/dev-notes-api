import { User } from "./../types/userTypes";
import {
  generateJwtTokenModel,
  authenticateUserModel,
  addNewUserModel,
} from "./../models/authModel";
import { Request, Response } from "express";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

type jwtUserData = {
  user_Id: number;
  full_name: string;
  username: string;
};

dotenv.config();


export const authenticateUser = async (req: Request, res: Response) => {
  let result = await authenticateUserModel({
    email: req.body.email,
    password: req.body.password,
  });

  if (result.length) {
    try {
      let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;

      let data = {
        user_Id: result[0].user_id,
        full_name: result[0].full_name,
        username: result[0].username,
      };

      const token = jwt.sign(data, jwtSecretKey);

      return res.status(200).json({
        status: "Usuário logado com sucesso!",
        token: token,
      });
    } catch (error) {
      return res.status(401).json({
        status: "unauthorized",
        token: null,
      });
    }
  } else {
    return res.status(401).json({
      status: "Credenciais inválidas!",
      token: null,
    });
  }
};

export const addNewUser = async (req: Request, res: Response) => {
  let result: number;
  result = await addNewUserModel({
    email: req.body.email,
    full_name: req.body.full_name,
    username: req.body.username,
    password: req.body.password,
  });
    switch (result) {
      case 0:
        return res.status(200).json({
          status: "unauthorized",
          message: "Usuário já existente!",
        });
        

      case 2:
        return res.status(201).json({
          status: "success",
          message: "Usuário criado com sucesso!",
        });
        

      case 1:
        return res.status(401).json({
          status: "error",
          message: "Erro ao criar usuário!",
        });
        
    }
};

export const returnJwtData = async (req: Request, res: Response) => {
  let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;

  await jwt.verify(
    req.body.token,
    jwtSecretKey,
    (err: string, decoded: any) => {
      if (decoded) {
        return res.status(200).json({
          decoded,
        });
      } else {
        return res.status(401).json({
          status: "decode error",
        });
      }
    }
  );
};
