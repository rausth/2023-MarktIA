import { axiosAPI } from "@/configs/axios";
import { AxiosResponse } from "axios";

export const AddressController = {
    getStates(): Promise<AxiosResponse<string[]>> {
        return axiosAPI.get("/address/states");
    },

    getCities(state: string): Promise<AxiosResponse<string[]>> {
        return axiosAPI.get(`/address/cities?state=${state}`);
    }
}