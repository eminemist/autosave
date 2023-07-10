//IMPORT EXPRESS ROUTER FUNCTION
import express from "express";
const router = express.Router();

import {
  findFile,
  createFile,
  updateFile,
  deleteFile,
  findAllFiles
} from "../controllers/fileController.js";

//SETUP ROUTES AND DIRECT THEM TO ROUTER
router.route("/:id").patch(findFile);
router.route("/findAllFiles").get(findAllFiles);
router.route("/").post(createFile);
router.route("/:id").delete(deleteFile).patch(updateFile);


export default router;
