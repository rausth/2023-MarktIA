import { FederationResponseDTO } from "../federations/federationResponseDTO";

export type AddressResponseDTO = {
    id: string;
    federation: FederationResponseDTO;
    publicPlace: string;
    number: number;
    complement: string;
}