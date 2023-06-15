import { AddressRequestDTO } from "../addresses/addressRequestDTO";

export type UserRequestDTO = {
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    telephone: string;
    address: AddressRequestDTO;
    imageURL?: string; 
}