import { ServiceType } from "@/enums/serviceType";
import { Address } from "./address";
import { User, UserBasicInfo } from "./user";
import { Scheduling, SchedulingBasicInfo } from "./scheduling";

export type Service = {
    id: string;
    provider: User;
    address?: Address;
    title: string;
    type: ServiceType;
    description: string;
    price: number;
    picpayUser: string;
    schedulings: Array<Scheduling>
}

export type ServiceBasicInfo = {
    id: string;
    title: string;
    provider: UserBasicInfo;
}