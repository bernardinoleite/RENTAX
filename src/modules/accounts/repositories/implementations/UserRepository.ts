import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { IUserRepository } from "../IUsersRepository.js";
import { User } from "../../entities/User.js";
import { AppDataSource } from "../../../../database/data-source.js";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO.js";



class UserRepository implements IUserRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

        const user = this.repository.create({ name, email, password, driver_license });

        await this.repository.save(user);
    }



}



export {
    UserRepository
}