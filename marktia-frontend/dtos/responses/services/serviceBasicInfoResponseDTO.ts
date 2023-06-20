import { UserBasicInfoResponseDTO } from "../users/userBasicInfoResponseDTO";

export type ServiceBasicInfoResponseDTO = {
    id: string;
    title: string;
    provider: UserBasicInfoResponseDTO;
}