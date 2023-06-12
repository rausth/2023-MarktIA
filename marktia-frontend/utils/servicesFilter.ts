import { FederationRequestDTO } from "@/dtos/requests/federations/federationRequestDTO";

export type ServicesFilter = {
    myServices?: boolean;
    name?: string | null;
    type?: number | null;
    federation?: FederationRequestDTO;
}