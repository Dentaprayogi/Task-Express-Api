import { query } from "../database/db.js";

export const insertNotes = async (req, res) => {
  const { title, datetime, note } = req.body;
  try {
    // Insert data ke tabel notes
    const result = await query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)",
      [title, datetime, note]
    );

    // Ambil ID dari data yang baru saja ditambahkan
    const insertId = result.insertId;

    // Lakukan SELECT untuk mendapatkan data yang baru saja ditambahkan
    const [newNote] = await query("SELECT * FROM notes WHERE id = ?", [
      insertId,
    ]);

    return res.status(200).json({ msg: "Note Ditambahkan", data: newNote });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "terjadi kesalahan pada server" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await query("SELECT * FROM notes");
    return res.status(200).json(notes);
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [note] = await query("SELECT * FROM notes WHERE id = ?", [id]);
    if (!note) {
      return res.status(404).json({ msg: "Catatan tidak ditemukan" });
    }
    return res.status(200).json(note);
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  try {
    const result = await query(
      "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
      [title, datetime, note, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Catatan tidak ditemukan" });
    }
    return res.status(200).json({ msg: "Catatan berhasil diperbarui" });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    // Periksa apakah note dengan ID yang diberikan ada
    const [existingNote] = await query("SELECT * FROM notes WHERE id = ?", [
      id,
    ]);
    if (!existingNote) {
      return res.status(404).json({ msg: "Note tidak ditemukan" });
    }

    // Hapus data note
    await query("DELETE FROM notes WHERE id = ?", [id]);

    return res.status(200).json({ msg: "Note berhasil dihapus" });
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
