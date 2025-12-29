import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization; // when request send the token will came from header > authorization
      if (!authHeader) {
        return res.status(401).json({ message: "You are not allowed!!" });
      }
      const token = authHeader?.split(" ")[1];
      console.log("THis is token for check", token);
      if (!token) {
        return res.status(500).json({ message: "You are not allowed!!" });
      } // if token not found then return with error message

      const decoded = jwt.verify(
        token,
        config.JWT_SECRET as string
      ) as JwtPayload;

      req.user = decoded; // puting decoded value in req.user parameter

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          error: "unatuhorized!!",
        });
      }
      next(); // if everything fine then it will go next
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
