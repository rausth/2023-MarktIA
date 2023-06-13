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

    url += `providerId=${servicesFilter.providerId ? servicesFilter.providerId : ""}&`;
    url += `name=${servicesFilter.name ? servicesFilter.name : ""}&`;
    url += `type=${servicesFilter.type ? servicesFilter.type : ""}&`;

    url += `stateId=${servicesFilter.federation?.stateId ? servicesFilter.federation.stateId : ""}&`;
    url += `regionId=${servicesFilter.federation?.regionId ? servicesFilter.federation.regionId : ""}&`;
    url += `countyId=${servicesFilter.federation?.countyId ? servicesFilter.federation.countyId : ""}&`;

    return url;
}