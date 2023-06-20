import { UserBasicInfoResponseDTO } from "../users/userBasicInfoResponseDTO";

export type SchedulingBasicInfoResponseDTO = {
    id: string;
    provider: UserBasicInfoResponseDTO;
    consumer: UserBasicInfoResponseDTO;
}