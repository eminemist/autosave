
import Files from "../models/Files.js";
import { StatusCodes } from "http-status-codes";

const createFile = async (req,res) =>{
  // const {file} =req.body
  // req.body.createdBy = req.User.userId
  // const newfile = await Files.create(req.body)
  // res.status(StatusCodes.CREATED)
  //    .json({file})
  res.status(StatusCodes.CREATED)
      .json({"file":"created"})
}

const findFile = async (req, res) => {
  // const file = await File.find({createdBy:req.user.userId})
  // res.status(StatusCodes.OK)
  //    .json({file,totalFiles:file.length,numOfPages : 1});
  res.status(StatusCodes.CREATED)
     .json({ "file": "found" });
};

const updateFile = async (req,res) =>{
   //res.status(StatusCodes.OK).json({ file });
   res.status(StatusCodes.CREATED)
      .json({ "file": "updated" });
};

const deleteFile = async (req, res) => {
//  const file=req.fileId 
//  await file.remove();
//  res.status(StatusCodes.OK).json({ msg: "Success! file removed" });
res.status(StatusCodes.CREATED)
   .json({ "file": "deleted" });
};

const findAllFiles = async (req,res) =>{
  // res.status(StatusCodes.OK).json({ file, totalfiles, numOfPages });
  
}


export { findFile, createFile, updateFile, deleteFile , findAllFiles }; 