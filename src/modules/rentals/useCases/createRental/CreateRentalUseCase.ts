import { Rental } from "../../infra/typeorm/entities/Rental.js";
import { IRentalsRepository } from "../../repositories/IRentalsRepository.js";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider.js";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository.js";
import { AppError } from "../../../../shared/errors/AppError.js";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider,
        private carsRepository: ICarsRepository
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        // Verifica se o carro já está alugado
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        // Verifica se o usuário já tem aluguel em andamento
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user");
        }

        // Regra de devolução mínima: 24 horas
        const dateNow = this.dateProvider.dateNow();
        // @ts-ignore
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if (compare < 24) {
            throw new AppError("Invalid return time. Minimum rental time is 24 hours");
        }

        // Criação do aluguel
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
