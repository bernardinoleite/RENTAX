import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository.js";

interface IPayload {
    sub: string
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = jwt.verify(token, "fsdjcgvxfcwdsfcmawdszxnfclwds") as IPayload;

        const userRepository = new UserRepository();

        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new Error("User does not exists   ")
        }

        next()
    } catch (error) {
        throw new Error("Invalid Error");
    }
}