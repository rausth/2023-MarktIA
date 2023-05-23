import { UserRole } from "@/enums/userRole";
import { MOCKED_ADDRESSES } from "./address";

export const MOCKED_USERS = [
    {
        id: 0,
        name: "USER_NAME_1",
        email: "user1@email.com",
        password: "123",
        cpf: "12345678900",
        cnpj: null,
        telephone: "27996070764",
        address: MOCKED_ADDRESSES[0],
        role: UserRole.NORMAL_USER,
        creationDate: new Date(),
        updateDate: null,
        imageURL: "https://img.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg?w=2000"
    },
    {
        id: 1,
        name: "USER_NAME_2",
        email: "user2@email.com",
        password: "123",
        cpf: "12345678900",
        cnpj: null,
        telephone: "27996070764",
        address: MOCKED_ADDRESSES[1],
        role: UserRole.NORMAL_USER,
        creationDate: new Date(),
        updateDate: null,
        imageURL: "https://img.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg?w=2000"
    },
    {
        id: 2,
        name: "USER_NAME_3",
        email: "user3@email.com",
        password: "123",
        cpf: "12345678900",
        cnpj: "12528708000107",
        telephone: "27996070764",
        address: MOCKED_ADDRESSES[2],
        role: UserRole.PROVIDER,
        creationDate: new Date(),
        updateDate: null,
        imageURL: "https://img.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg?w=2000"
    }
]