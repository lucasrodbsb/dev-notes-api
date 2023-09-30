import { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;

  const bearerToken = req.headers["x-access-token"];

  if (typeof bearerToken !== "undefined") {
    try {
      jwt.verify(bearerToken, jwtSecretKey, (err: string, token: string) => {
        if (err) {
          res.status(401).send({
            status: "unauthorized",
            errorMsg: err,
          });
        } else {
          next();
        }
      });
    } catch (error) {
      return res.status(401).send({
        status: "unauthorized",
        errorMsg: error,
      });
    }
  } else {
    return res.status(401).send({
      status: "unauthorized",
      errorMsg: "undefined token",
    });
  }
};
