import {
  addNoteModel,
  deleteNotesByNoteIdModel,
  editNoteByNoteIdModel,
  getAllNotesByUserIdModel,
  getNoteByNoteIdModel,
} from "./../models/notesModel";
import { Request, Response } from "express";

export const getNotesByUserId = async (req: Request, res: Response) => {
  let result = await getAllNotesByUserIdModel({
    user_id: +req.params.user_id ?? 0,
  });

  return res.status(200).send(result);
};

export const getNoteByNoteId = async (req: Request, res: Response) => {
  let result = await getNoteByNoteIdModel({
    note_id: +req.params.note_id ?? 0,
  });

  return res.status(200).send(result);
};

export const deleteNotesByNoteId = async (req: Request, res: Response) => {
  let result = await deleteNotesByNoteIdModel({
    note_id: +req.params.note_id ?? 0,
  });

  return res.status(200).send(result);
};

export const addNote = async (req: Request, res: Response) => {
  let result = await addNoteModel({
    user_id: +req.body.user_id ?? 0,
    title: req.body.title,
    noteBody: req.body.noteBody,
    datetime: +req.body.datetime,
  });

  if (result[1] == 0) {
    return res.status(401).send({
      message: "Erro ao adicionar nota.",
    });
  } else if (result[1] == 1) {
    return res.status(200).send({
      message: "Nota adicionada com sucesso!",
    });
  }
};

export const editNoteByNoteId = async (req: Request, res: Response) => {
  let result = await editNoteByNoteIdModel({
    note_id: +req.params.note_id ?? 0,
    user_id: +req.body.user_id ?? 0,
    title: req.body.title,
    noteBody: req.body.noteBody,
    datetime: +req.body.datetime,
  });

  if (result[1] == 0) {
    return res.status(401).send({
      message: "Erro ao editar nota.",
    });
  } else if (result[1] == 1) {
    return res.status(200).send({
      message: "Nota editada com sucesso!",
    });
  }
};
