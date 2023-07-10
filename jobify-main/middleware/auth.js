import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
UnAuthenticatedError;
const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Error");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user request object
    //req.user=payload;
    //console.log(payload)
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Error");
  }
};

export default auth;
