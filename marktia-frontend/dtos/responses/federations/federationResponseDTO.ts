import { DistrictResponseDTO } from "./countyResponseDTO";
import { RegionResponseDTO } from "./regionResponseDTO";
import { StateResponseDTO } from "./stateResponseDTO"

export type FederationResponseDTO = {
    state: StateResponseDTO;
    region: RegionResponseDTO;
    county: DistrictResponseDTO;
}