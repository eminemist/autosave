//IMPORT EXPRESS ROUTER FUNCTION
import express from "express";
const router = express.Router();
// const auth = require('../middleware/auth.js')
import auth from "../middleware/auth.js"

import {
  findFile,
  createFile,
  updateFile,
  deleteFile,
  findAllFiles
} from "../controllers/fileController.js";

//SETUP ROUTES AND DIRECT THEM TO ROUTER
// router.route("/findFile/:id").patch(findFile);
// router.route("/findAllFiles").get(findAllFiles);
// router.route("/createFile").post(createFile);
// router.route("/:id").delete(deleteFile).patch(updateFile);

router.route("/").get(findAllFiles);
router.route("/").put( createFile);
router.route("/:id").get( findFile);
router.route("/:id").put( updateFile);
router.route("/:id").delete( deleteFile);


export default router;
