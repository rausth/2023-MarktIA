import { axiosAPI } from "@/configs/axios";
import { AuthRequestDTO } from "@/dtos/requests/auth/authRequestDTO";
import { RegisterRequestDTO } from "@/dtos/requests/auth/registerRequestDTO";
import { AuthResponseDTO } from "@/dtos/responses/auth/authResponseDTO";
import { AxiosResponse } from "axios";

export const AuthController = {
    authenticate(authRequestDTO: AuthRequestDTO): Promise<AxiosResponse<AuthResponseDTO>> {
        return axiosAPI.post("/auth/authenticate", authRequestDTO);
    },

    register(registerRequestDTO: RegisterRequestDTO): Promise<void> {
        return axiosAPI.post("/auth/register", registerRequestDTO);
    }
}