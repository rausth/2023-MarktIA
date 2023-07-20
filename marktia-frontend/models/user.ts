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
    userRole: UserRole;
    creationDate: string;
    updateDate?: string;
    imageURL?: string;
}

export type UserBasicInfo = {
    id: string;
    name: string;
    imageURL?: string;
}

export type UserPersonalData = {
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    telephone: string;
    userRole: number;
}

export type UserAuthInfo = {
    id: string;
    name: string;
    userRole: UserRole;
}