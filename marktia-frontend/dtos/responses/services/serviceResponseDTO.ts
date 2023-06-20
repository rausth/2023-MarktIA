import { AddressResponseDTO } from "../address/AddressResponseDTO";
import { SchedulingResponseDTO } from "../schedulings/schedulingResponseDTO";
import { UserResponseDTO } from "../users/userResponseDTO";

export type ServiceResponseDTO = {
    id: string;
    provider: UserResponseDTO;
    address?: AddressResponseDTO;
    title: string;
    type: number;
    description: string;
    price: number;
    picpayUser: string;
    schedulings: Array<SchedulingResponseDTO>;
}