import { IUserRepository } from "../../repositories/IUsersRepository.js";
import { deleteFile } from "../../../../utils/file.js";
interface IRequest {
    user_id: string;
    avatar_file: string;
}

class UpdateUserAvatarUseCase {

    constructor(private userRepository: IUserRepository) {

    }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.userRepository.findById(user_id);
        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }
        user.avatar = avatar_file;
        await this.userRepository.create(user);

    }
}


export {
    UpdateUserAvatarUseCase
}