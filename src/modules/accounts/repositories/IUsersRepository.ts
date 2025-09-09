import { ICreateUserDTO } from "../dtos/ICreateUsersDTO.js"


interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>
}




export {
    IUserRepository
}


