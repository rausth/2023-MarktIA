export type RegisterRequestDTO = {
    role: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string | null;
    telephone: string;
    addressId: string;
    imageURL?: string | null;
}