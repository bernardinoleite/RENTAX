import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO.js";
import { IUserRepository } from "../../repositories/IUsersRepository.js";
import { AppError } from "../../../../errors/AppError.js";


class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {

    }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

        const passwordHash = await hash(password, 8);
        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists", 409)
        }

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });

    }

}

export {
    CreateUserUseCase
}