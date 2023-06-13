import { axiosAPI } from "@/configs/axios"
import { ServiceRequestDTO } from "@/dtos/requests/services/serviceRequestDTO";
import { ServiceBasicInfoResponseDTO } from "@/dtos/responses/services/serviceBasicInfoResponseDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { ServicesFilter } from "@/utils/servicesFilter"
import { AxiosResponse } from "axios";

export const ServicesController = {
    getAll(servicesFilter: ServicesFilter, token: string): Promise<AxiosResponse<ServiceBasicInfoResponseDTO[]>> {
        return axiosAPI.get("/services" + getURLParams(servicesFilter), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    getById(id: string, token: string): Promise<AxiosResponse<ServiceResponseDTO>> {
        return axiosAPI.get(`/services/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    create(serviceRequestDTO: ServiceRequestDTO, token: string): Promise<AxiosResponse<ServiceResponseDTO>> {
        return axiosAPI.post("/services", serviceRequestDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

const getURLParams = (servicesFilter: ServicesFilter) => {
    let url = "?";

    if (servicesFilter.myServices) url += `myServices=${servicesFilter.myServices}&`;
    if (servicesFilter.name) url += `name=${servicesFilter.name}&`;
    if (servicesFilter.type) url += `type=${servicesFilter.type}&`;

    if (servicesFilter.federation) {
        if (servicesFilter.federation.stateId) url += `stateId=${servicesFilter.federation.stateId}&`;
        if (servicesFilter.federation.regionId) url += `stateId=${servicesFilter.federation.regionId}&`;
        if (servicesFilter.federation.countyId) url += `countyId=${servicesFilter.federation.stateId}&`;
    }

    return url;
}