import { UserRole } from "@/enums/userRole";
import { Address } from "./address";

export type User = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    telephone: string;
    address: Address;
    role: UserRole;
    creationDate: string;
    updateDate?: string;
    imageURL: string;
}

export type UserBasicInfo = {
    id: string;
    name: string;
    imageURL: string;
}

export type UserPersonalData = {
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    telephone: string;
    role: number;
}