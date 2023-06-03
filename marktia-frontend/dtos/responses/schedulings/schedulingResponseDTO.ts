import { UserResponseDTO } from "../users/userResponseDTO";

export type SchedulingResponseDTO = {
    id: string;
    serviceId: string;
    consumer: UserResponseDTO;
    status: number;
    creationDate: string;
    completionDate?: string;
}