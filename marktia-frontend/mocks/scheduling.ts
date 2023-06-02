import { SchedulingStatus } from "@/enums/schedulingStatus";
import { MOCKED_USERS } from "./user";

export const MOCKED_SCHEDULINGS = [
    {
        id: "0",
        serviceId: "0",
        consumer: MOCKED_USERS[1],
        status: SchedulingStatus.OPENED,
        creationDate: "11-01-2001",
        completionDate: undefined
    },
    {
        id: "1",
        serviceId: "1",
        consumer: MOCKED_USERS[0],
        status: SchedulingStatus.DELIVERED,
        creationDate: "11-01-2001",
        completionDate: undefined
    },
    {
        id: "2",
        serviceId: "2",
        consumer: MOCKED_USERS[1],
        status: SchedulingStatus.FINISHED,
        creationDate: "11-01-2001",
        completionDate: "12-01-2001"
    }
]