import { UserRepository } from "../../repositories/implementations/UserRepository.js";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase.js";
import { AuthenticateUserController } from "./AuthenticateUserController.js";

export default (): AuthenticateUserController => {
    const userRepository = new UserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);
    return authenticateUserController;
}

