import { axiosAPI } from "@/configs/axios";
import { DistrictResponseDTO } from "@/dtos/responses/federations/districtResponseDTO";
import { RegionResponseDTO } from "@/dtos/responses/federations/regionResponseDTO";
import { StateResponseDTO } from "@/dtos/responses/federations/stateResponseDTO";
import { AxiosResponse } from "axios";

export const FederationController = {
    getStates(): Promise<AxiosResponse<StateResponseDTO[]>> {
        return axiosAPI.get("/federations/states");
    },

    getRegionsByState(stateId: string): Promise<AxiosResponse<RegionResponseDTO[]>> {
        return axiosAPI.get(`/federations/regions?stateId=${stateId}`);
    },

    getDistrictsByRegion(regionId: string): Promise<AxiosResponse<DistrictResponseDTO[]>> {
        return axiosAPI.get(`/federations/districts?regionId=${regionId}`);
    }
}