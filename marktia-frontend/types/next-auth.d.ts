import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            cpf: string;
            cnpj: string | null;
            telephone: string;
            address: {
                id: number;
                state: string;
                county: string;
                district: string;
                publicPlace: string;
                number: string;
                complement: string;
            }
            role: number;
            creationDate: string;
            updatedDate: string | null;
            imageURL: string;
            token: string;
        };
    }
}