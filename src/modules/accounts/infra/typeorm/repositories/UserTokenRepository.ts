import { Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO.js";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository.js";
import { UserToken } from "../entities/UserToken.js";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source.js";


class UserTokenRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>
    constructor() {
        this.repository = AppDataSource.getRepository(UserToken);
    }
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({ expires_date, refresh_token, user_id })
        await this.repository.save(userToken)

        return userToken;
    }

}

export {
    UserTokenRepository
}