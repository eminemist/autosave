import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  //NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Provide all values");
  }

  const userAlreadyExsist = User.findOne({ email });
  if (!userAlreadyExsist) {
    throw new BadRequestError("Email already in use controller");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  console.log(user);

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};


const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  console.log(email)
  if(!email || !name || !location || !lastName){
    throw new BadRequestError('Please Provide all values')
  }
  
  const user = await User.findOne({_id:req.user.userId});
   console.log(user)
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const  token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
