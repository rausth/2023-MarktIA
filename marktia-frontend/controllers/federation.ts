import { axiosAPI } from "@/configs/axios";
import { CountyResponseDTO } from "@/dtos/responses/federations/countyResponseDTO";
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

    getCountysByStateAndRegion(stateId: string, regionId: string): Promise<AxiosResponse<CountyResponseDTO[]>> {
        return axiosAPI.get(`/federations/countys?stateId=${stateId}&regionId=${regionId}`);
    }
}