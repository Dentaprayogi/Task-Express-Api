import express from "express";
import notesRoute from "./notes.route.js";

const router = express();

router.use(notesRoute);

export default router;
