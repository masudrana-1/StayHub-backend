import { NextFunction } from "express-serve-static-core";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"]
}