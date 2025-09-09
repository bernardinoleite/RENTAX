import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO.js";
import { IUserRepository } from "../../repositories/IUsersRepository.js";


class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {

    }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.create({
            name,
            email,
            password,
            driver_license
        });

    }

}

export {
    CreateUserUseCase
}