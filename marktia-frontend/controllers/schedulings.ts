import { axiosAPI } from "@/configs/axios"
import { SchedulingRequestDTO } from "@/dtos/requests/schedulings/schedulingRequestDTO";
import { SchedulingStatusUpdateRequestDTO } from "@/dtos/requests/schedulings/schedulingStatusUpdateRequestDTO";
import { SchedulingBasicInfoResponseDTO } from "@/dtos/responses/schedulings/schedulingBasicInfoResponseDTO";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { AxiosResponse } from "axios";

export const SchedulingsController = {
    getAll(userId: string, asConsumer: boolean, schedulingStatus: number, token: string): Promise<AxiosResponse<SchedulingBasicInfoResponseDTO[]>> {
        return axiosAPI.get("/schedulings" + getURLParams(userId, asConsumer, schedulingStatus), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    getById(id: string, token: string): Promise<AxiosResponse<SchedulingResponseDTO>> {
        return axiosAPI.get(`/schedulings/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    create(schedulingRequestDTO: SchedulingRequestDTO, token: string): Promise<AxiosResponse<SchedulingResponseDTO>> {
        return axiosAPI.post("/schedulings", schedulingRequestDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    updateStatus(id: string, schedulingStatusUpdateRequestDTO: SchedulingStatusUpdateRequestDTO, token: string): Promise<AxiosResponse<SchedulingResponseDTO>> {
        return axiosAPI.put(`/schedulings/${id}`, schedulingStatusUpdateRequestDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

const getURLParams = (userId: string, asConsumer: boolean, schedulingStatus: number) => {
    let url = "?";

    url += `userId=${userId}&`;
    url += `asConsumer=${asConsumer}&`;
    url += `schedulingStatus=${schedulingStatus}`;

    return url;
}