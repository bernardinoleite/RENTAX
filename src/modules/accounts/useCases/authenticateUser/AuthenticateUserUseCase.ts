import { compare } from "bcrypt";
import { IUserRepository } from "../../repositories/IUsersRepository.js";
import jwt from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError.js";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string;
}

class AuthenticateUserUseCase {


    constructor(private usersRepository: IUserRepository) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = jwt.sign({}, "fsdjcgvxfcwdsfcmawdszxnfclwds", { subject: user.id, expiresIn: "1d" });

        const tokenReturn: IResponse = {
            user: { email: user.email, name: user.name },
            token
        }

        return tokenReturn;
    }
}

export {
    AuthenticateUserUseCase
}