import { AddressRequestDTO } from "../addresses/addressRequestDTO";

export type ServiceRequestDTO = {
    providerId?: string;
    title: string;
    type: number;
    description: string;
    price: number;
    picpayUser: string;
    address?: AddressRequestDTO | null;
}