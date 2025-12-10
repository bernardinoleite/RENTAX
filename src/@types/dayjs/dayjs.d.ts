
import { ConfigType, Dayjs } from "dayjs";

declare module "dayjs" {
    interface Dayjs {
        utc(config?: ConfigType): Dayjs;
        local(): Dayjs;
    }
}
