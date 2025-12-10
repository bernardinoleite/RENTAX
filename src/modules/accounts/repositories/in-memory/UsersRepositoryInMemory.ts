import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO.js";
import { User } from "../../infra/typeorm/entities/User.js";
import { IUserRepository } from "../IUsersRepository.js";

class UsersRepositoryInMemory implements IUserRepository {
    private users: User[] = [];

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, data);
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);
        return user
    }
}

export {
    UsersRepositoryInMemory
}