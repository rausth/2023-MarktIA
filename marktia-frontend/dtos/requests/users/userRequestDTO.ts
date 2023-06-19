import { AddressRequestDTO } from "../addresses/addressRequestDTO";

export type UserRequestDTO = {
    imageURL: string | null; 
    userRole: number;
    name: string;
    email: string;
    telephone: string;
    cpf: string;
    cnpj?: string;
    address: AddressRequestDTO;
}