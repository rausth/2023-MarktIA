import { axiosAPI } from "@/configs/axios";
import { AuthRequestDTO } from "@/dtos/requests/auth/authRequestDTO";
import { RegisterRequestDTO } from "@/dtos/requests/auth/registerRequestDTO";
import { UserAuthResponseDTO } from "@/dtos/responses/users/userAuthResponseDTO";
import { AxiosResponse } from "axios";

export const AuthController = {
    getUserFromToken(token: string): Promise<AxiosResponse<UserAuthResponseDTO>> {
        return axiosAPI.get(`/auth/user?token=${token}`);
    },

    authenticate(authRequestDTO: AuthRequestDTO): Promise<AxiosResponse<string>> {
        return axiosAPI.post("/auth/authenticate", authRequestDTO);
    },

    register(registerRequestDTO: RegisterRequestDTO): Promise<void> {
        return axiosAPI.post("/auth/register", registerRequestDTO);
    }
}