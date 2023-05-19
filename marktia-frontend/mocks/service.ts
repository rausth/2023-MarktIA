import { MOCKED_USERS } from "./user";

export const MOCKED_SERVICES = [
    {
        id: 0,
        name: "SERVICE_NAME_1",
        responsible: MOCKED_USERS[1],
        status: "OPEN",
        description: "Serviço para formatar PC",
        price: 123.456
    },
    {
        id: 1,
        name: "SERVICE_NAME_2",
        responsible: MOCKED_USERS[2],
        status: "OPEN",
        description: "Serviço para consertar geladeira",
        price: 100.000
    },
    {
        id: 2,
        name: "SERVICE_NAME_3",
        responsible: MOCKED_USERS[2],
        status: "CLOSED",
        description: "Serviço para consertar lampada",
        price: 50.00
    }
]