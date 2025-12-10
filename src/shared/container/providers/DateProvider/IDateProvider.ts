import dayjs from "dayjs";



interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(data: Date);
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
}


export {
    IDateProvider
}