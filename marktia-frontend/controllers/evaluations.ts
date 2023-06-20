import { axiosAPI } from "@/configs/axios";
import { EvaluationRequestDTO } from "@/dtos/requests/evaluations/evaluationRequestDTO";
import { EvaluationResponseDTO } from "@/dtos/responses/evaluations/evaluationResponseDTO";
import { AxiosResponse } from "axios";

export const EvaluationsController = {
    getByService(serviceId: string, token: string): Promise<AxiosResponse<EvaluationResponseDTO[]>> {
        return axiosAPI.get(`/evaluations?serviceId=${serviceId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    create(evaluationRequestDTO: EvaluationRequestDTO, token: string): Promise<AxiosResponse<void>> {
        return axiosAPI.post("/evaluations", evaluationRequestDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}