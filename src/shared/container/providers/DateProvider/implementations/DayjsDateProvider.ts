import { IDateProvider } from "../IDateProvider.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppError } from "../../../../errors/AppError.js";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {

    dateNow(): Date {
        return dayjs().utc().startOf("hour").toDate();;
    }
    convertToUTC(data: Date) {
        throw new AppError("Method not implemented.");
    }
    compareInHours(start_date: Date, end_date: Date): number {

        const expectedReturnDateFormat = dayjs(end_date).utc().startOf("hour");

        const compare = expectedReturnDateFormat.diff(start_date, "hour");


        return compare
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const startDateFormat = dayjs(start_date).utc().startOf("day");
        const endDateFormat = dayjs(end_date).utc().startOf("day");

        return endDateFormat.diff(startDateFormat, "days");
    }

}

export {
    DayjsDateProvider
}