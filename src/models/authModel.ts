import { User } from "./../types/userTypes";
import { db } from "./db";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { JsonWebTokenError } from "jsonwebtoken";

export const generateJwtTokenModel = async ({}: {}) => {};

export const authenticateUserModel = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let result = await db
    .query<User>(
      "SELECT * FROM users WHERE email = :email AND password = :password",
      {
        type: QueryTypes.SELECT,
        replacements: {
          email,
          password,
        },
      }
    )
    .catch();
    
  return result;
};

export const addNewUserModel = async ({
  email,
  password,
  username,
  full_name,
}: Pick<User, "email" | "full_name" | "username" | "password">) => {
  let result: number = 2;

  let userAlreadyExists;

  userAlreadyExists = await db.query(
    "SELECT * FROM users WHERE email = :email OR username = :username",
    {
      type: QueryTypes.SELECT,
      replacements: {
        email,
        username,
      },
    }
  );
  if (userAlreadyExists.length) {
    result = 0;
  } else {
    await db
      .query(
        "INSERT INTO `users`(`username`, `password`, `full_name`, `email`)  VALUES (:username , :password , :full_name , :email)",
        {
          type: QueryTypes.INSERT,
          replacements: {
            email,
            full_name,
            username,
            password,
          },
        }
      )
      .then(() => {
        result = 2;
      })
      .catch(() => {
        result = 1;
      });
  }
  return result;
};
