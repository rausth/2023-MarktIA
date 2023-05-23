import { SchedulingStatus } from "@/enums/schedulingStatus";
import { MOCKED_SERVICES } from "./service";
import { MOCKED_USERS } from "./user";

export const MOCKED_SCHEDULINGS = [
    {
        id: 0,
        service: MOCKED_SERVICES[0],
        consumer: MOCKED_USERS[1],
        status: SchedulingStatus.OPENED,
        creationDate: new Date(),
        completionDate: null
    },
    {
        id: 1,
        service: MOCKED_SERVICES[1],
        consumer: MOCKED_USERS[0],
        status: SchedulingStatus.DELIVERED,
        creationDate: new Date(),
        completionDate: null
    },
    {
        id: 2,
        service: MOCKED_SERVICES[2],
        consumer: MOCKED_USERS[1],
        status: SchedulingStatus.FINISHED,
        creationDate: new Date("2023-05-22"),
        completionDate: new Date()
    }
]