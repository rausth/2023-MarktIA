import { FederationRequestDTO } from "@/dtos/requests/federations/federationRequestDTO";

export type ServicesFilter = {
    providerId?: string | null;
    name?: string | null;
    type?: number | null;
    federation?: FederationRequestDTO;
}