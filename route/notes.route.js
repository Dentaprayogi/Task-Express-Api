import express from "express";
import {
  insertNotes,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controller/notes.controller.js";

const router = express.Router();

router.post("/tambah_note", insertNotes);
router.get("/tampilkan_note", getAllNotes);
router.get("/tampilkan_note/:id", getNoteById);
router.put("/ubah_note/:id", updateNote);
router.delete("/hapus_note/:id", deleteNote);
export default router;
