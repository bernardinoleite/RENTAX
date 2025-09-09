import { ICreateUserDTO } from "../dtos/ICreateUsersDTO.js"
import { User } from "../entities/User.js"


interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>


}




export {
    IUserRepository
}


