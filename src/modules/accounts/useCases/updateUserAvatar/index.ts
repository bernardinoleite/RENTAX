import { UserRepository } from "../../repositories/implementations/UserRepository.js";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase.js";
import { UpdateUserAvatarController } from "./UpdateUserAvatarController.js";


export default (): UpdateUserAvatarController => {
    const userRepository = new UserRepository();
    const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(userRepository);
    const updateUserAvatarController = new UpdateUserAvatarController(updateUserAvatarUseCase);
    return updateUserAvatarController;
}