import { SchedulingStatus } from "@/enums/schedulingStatus";
import { User, UserBasicInfo } from "./user";

export type Scheduling = {
    id: string;
    serviceId: string;
    consumer: User;
    status: SchedulingStatus;
    creationDate: string;
    completionDate?: string;
}

export type SchedulingBasicInfo = {
    id: string;
    provider: UserBasicInfo;
    consumer: UserBasicInfo;
}