import { StatusCodes } from "http-status-codes";
import { BadRequestError , UnAuthenticatedError } from "../errors/index.js";
import Files from "../models/Files.js";

const createFile = async (req,res) =>{
  const {file} =req.body

  if(!file){
    throw new BadRequestError('No File')
  }
  req.body.createdBy = req.User.userId
  const newfile = await Files.create(req.body)
  res.status(StatusCodes.CREATED)
     .json({file})


}

const findFile = async (req, res) => {
  const file = await File.find({createdBy:req.user.userId})
  res.status(StatusCodes.OK)
     .json({file,totalFiles:file.length,numOfPages : 1});
};

const updateFile = async (req,res) =>{
   const { id: fileId } = req.params;

   const { toUpdate } = req.body;

   

   const file = await Files.findOne({ _id: fileId });

   if (!file) {
     throw new NotFoundError(`No file with id ${fileId}`);
   }

   // check permissions
  //  checkPermissions(req.user, job.createdBy);

   //alternative approach
   // job.position = position;
   // job.company = company;
   // job.jobLocation = jobLocation;

   // await job.save();

   const updatedJob = await Files.findOneAndUpdate({ _id: fileId }, req.body, {
     new: true,
     runValidators: true,
   });

   res.status(StatusCodes.OK).json({ file });
};

const deleteFile = async (req, res) => {
 const { id: fileId } = req.params;

 const file = await Files.findOne({ _id: fileId });

 if (!file) {
   throw new NotFoundError(`No file with id : ${fileId}`);
 }

//  checkPermissions(req.user, file.createdBy);

 await file.remove();
 res.status(StatusCodes.OK).json({ msg: "Success! file removed" });
};

const findAllFiles = async (req,res) =>{
  
    const { search, status, jobType, sort } = req.query;

    const queryObject = {
      createdBy: req.user.userId,
    };

    
    // NO AWAIT
    let result = Files.find(queryObject);



    // setup pagination
    // const limit = 10;
    // const skip = 1;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit; //10

    result = result.skip(skip).limit(limit);
    // 75
    // 10 10 10 10 10 10 10 5

    const file = await result;
    const totalfiles = await Files.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalfiles / limit);

    res.status(StatusCodes.OK).json({ file, totalfiles, numOfPages });
  
}


export { findFile, createFile, updateFile, deleteFile , findAllFiles }; 