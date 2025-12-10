import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider.js";
import { AppError } from "../../../../shared/errors/AppError.js";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository.js";
import { Rental } from "../../infra/typeorm/entities/Rental.js";
import { IRentalsRepository } from "../../repositories/IRentalsRepository.js";

interface IRequest {
    id: string;
    user_id: String;
}

class DevolutionRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository, private carsRepository: ICarsRepository, private dateProvider: IDateProvider) {

    }
    async execute({ id, user_id }: IRequest): Promise<Rental> {

        const minimumDaily = 1
        const rental = await this.rentalsRepository.findById(id);

        if (!rental) {
            throw new AppError("Rental does not exists", 404);
        }
        const car = await this.carsRepository.findById(rental.car_id);
        // Regra de devolução mínima: 24 horas
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());
        if (daily <= 0) {
            daily = minimumDaily;
        }
        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);
        let total = 0
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }
        total += daily * car.daily_rate
        rental.end_date = this.dateProvider.dateNow()

        rental.total = total
        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(rental.car_id, true);
        return rental
    }
}


export {
    DevolutionRentalUseCase
}