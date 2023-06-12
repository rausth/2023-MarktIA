import { AddressRequestDTO } from "../addresses/addressRequestDTO";

export type RegisterRequestDTO = {
    userRole: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string | null;
    telephone: string;
    address: AddressRequestDTO;
    imageURL?: string | null;
}