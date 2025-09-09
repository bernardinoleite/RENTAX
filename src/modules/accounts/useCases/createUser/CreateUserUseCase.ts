import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO.js";
import { IUserRepository } from "../../repositories/IUsersRepository.js";


class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {

    }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

        const passwordHash = await hash(password, 8);
        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("User already exists")
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