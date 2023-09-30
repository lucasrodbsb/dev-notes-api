import { deleteNotesByNoteId, getNotesByUserId, addNote, editNoteByNoteId, getNoteByNoteId } from './../controllers/notesController';
import { Router} from "express";
import { verifyJwtToken } from '../middlewares/verifyJwtToken';

const notesRoutes = Router();

notesRoutes.get('/get-notes/:user_id', verifyJwtToken, getNotesByUserId)

notesRoutes.delete('/delete-note/:note_id', verifyJwtToken, deleteNotesByNoteId)

notesRoutes.post('/add-note', verifyJwtToken, addNote)

notesRoutes.put('/edit-note/:note_id', verifyJwtToken, editNoteByNoteId)

notesRoutes.get('/get-note/:note_id', verifyJwtToken, getNoteByNoteId)

// notesRoutes.get("/")

export default notesRoutes


