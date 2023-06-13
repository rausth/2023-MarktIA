import { FederationResponseDTO } from "../federations/federationResponseDTO";

export type AddressResponseDTO = {
    id: string;
    federation: FederationResponseDTO;
    district: string;
    publicPlace: string;
    number: string;
    complement: string;
}