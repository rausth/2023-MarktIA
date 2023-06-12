import { DistrictResponseDTO } from "./districtResponseDTO";
import { RegionResponseDTO } from "./regionResponseDTO";
import { StateResponseDTO } from "./stateResponseDTO"

export type FederationResponseDTO = {
    state: StateResponseDTO;
    region: RegionResponseDTO;
    district: DistrictResponseDTO;
}