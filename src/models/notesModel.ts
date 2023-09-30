import { Notes } from "./../types/notesTypes";
import { db } from "./db";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { JsonWebTokenError } from "jsonwebtoken";

export const getAllNotesByUserIdModel = async ({
  user_id,
}: {
  user_id: number;
}) => {
  let result = await db
    .query<Notes>("SELECT * FROM notes WHERE user_id = :user_id", {
      type: QueryTypes.SELECT,
      replacements: {
        user_id,
      },
    })
    .catch();

  return result;
};

export const getNoteByNoteIdModel = async ({note_id}: {note_id:number}) => {
  let result = await db.query<Notes>("SELECT * from notes WHERE id = :note_id", {
    type: QueryTypes.SELECT,
    replacements: {
      note_id
    }
  }).catch()

  return result
}

export const deleteNotesByNoteIdModel = async ({
  note_id,
}: {
  note_id: number;
}) => {
  let result = await db
    .query("DELETE FROM `notes` WHERE id = :note_id", {
      type: QueryTypes.DELETE,
      replacements: {
        note_id,
      },
    })
    .catch();

  return result;
};

export const addNoteModel = async ({
  user_id,
  title,
  noteBody,
  datetime,
}: {
  user_id: number;
  title: string;
  noteBody: string;
  datetime: number;
}) => {
  let result = await db
    .query(
      "INSERT INTO `notes`(`user_id`, `title`, `body`, `datetime`) VALUES ( :user_id , :title , :noteBody , :datetime )",
      {
        type: QueryTypes.INSERT,
        replacements: {
          user_id,
          title,
          noteBody,
          datetime,
        },
      }
    )
    .catch();

  return result;
};

export const editNoteByNoteIdModel = async ({
  note_id,
  user_id,
  title,
  noteBody,
  datetime,
}: {
  note_id: number;
  user_id: number;
  title: string;
  noteBody: string;
  datetime: number;
}) => {
  let result = await db.query(
    "UPDATE notes SET title = :title , body = :noteBody , datetime = :datetime WHERE id = :note_id AND user_id = :user_id ",
    {
      type: QueryTypes.UPDATE,
      replacements: {
        note_id,
        user_id,
        title,
        noteBody,
        datetime,
      },
    }
  ).catch();

  return result;
};
