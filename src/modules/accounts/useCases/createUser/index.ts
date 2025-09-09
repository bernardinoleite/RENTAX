import { UserRepository } from "../../repositories/implementations/UserRepository.js";
import { CreateUserUseCase } from "./CreateUserUseCase.js";
import { CreateUserController } from "./CreateUserController.js";

export default (): CreateUserController => {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(createUserUseCase);
    return createUserController;
}