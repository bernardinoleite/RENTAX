import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO.js"
import { UserToken } from "../infra/typeorm/entities/UserToken.js"


interface IUsersTokensRepository {

    create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken>
}

export {
    IUsersTokensRepository
}