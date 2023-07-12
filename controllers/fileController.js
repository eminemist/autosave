import Files from "../models/Files.js";
import { StatusCodes } from "http-status-codes";

const createFile = async (req, res) => {
  try {
    const { title, content, _userId} = req.body;
    console.log(req.headers)
    const newFile = new Files({
      title,
      content,
      _userId
      //name: req.body.name,
    });
    
    await newFile.save();
    res.status(StatusCodes.CREATED).json( newFile );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const findFile = async (req, res) => {
  try {
    //console.log(req.body)
    const file = await Files.find({ _id: req.params.id });
    res.status(StatusCodes.CREATED).json(file);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateFile = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    await Files.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        content,
        date,
      }
    );
    res.status(StatusCodes.CREATED).json({ msg: "Updated a File" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    await Files.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.CREATED).json({ msg: "Deleted a File" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const findAllFiles = async (req, res) => {
  try {
    console.log("here",req.user)
    const file = await Files.find({ _userId: req.user.userId });
    console.log(file)
    res.status(StatusCodes.CREATED).json(file);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { findFile, createFile, updateFile, deleteFile, findAllFiles };
