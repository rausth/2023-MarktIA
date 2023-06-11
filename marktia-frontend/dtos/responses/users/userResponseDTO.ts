import { AddressResponseDTO } from "../address/AddressResponseDTO";

export type UserResponseDTO = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    telephone: string;
    address: AddressResponseDTO;
    userRole: number;
    creationDate: string;
    updateDate?: string;
    imageURL?: string;
}