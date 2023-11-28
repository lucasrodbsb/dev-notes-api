import { deleteNotesByNoteId, getNotesByUserId, addNote, editNoteByNoteId, getNoteByNoteId, deleteAllNotesByUserId } from './../controllers/notesController';
import { Router} from "express";
import { verifyJwtToken } from '../middlewares/verifyJwtToken';

const notesRoutes = Router();

notesRoutes.get('/notes/get-all/:user_id', verifyJwtToken, getNotesByUserId)

notesRoutes.delete('/notes/delete/:note_id', verifyJwtToken, deleteNotesByNoteId)

notesRoutes.delete('/notes/delete-all/:user_id', verifyJwtToken, deleteAllNotesByUserId)

notesRoutes.post('/notes/add', verifyJwtToken, addNote)

notesRoutes.put('/notes/edit/:note_id', verifyJwtToken, editNoteByNoteId)

notesRoutes.get('/notes/get/:note_id', verifyJwtToken, getNoteByNoteId)

export default notesRoutes


