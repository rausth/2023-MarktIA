import { UserResponseDTO } from "@/dtos/responses/users/userResponseDTO";
import { axiosAPI } from '@/configs/axios';
import { AxiosResponse } from "axios";
import { UserRequestDTO } from "@/dtos/requests/users/userRequestDTO";
import { AddressResponseDTO } from "@/dtos/responses/address/AddressResponseDTO";

export const UsersController = {
    getById(id: string, token: string): Promise<AxiosResponse<UserResponseDTO>> {
        return axiosAPI.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    getAddress(id: string, token: string): Promise<AxiosResponse<AddressResponseDTO>> {
        return axiosAPI.get(`/users/${id}/address`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    update(id: string, userRequestDTO: UserRequestDTO, token: string): Promise<AxiosResponse<UserResponseDTO>> {
        return axiosAPI.put(`/users/${id}`, userRequestDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    delete(id: string, token: string): Promise<void> {
        return axiosAPI.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}