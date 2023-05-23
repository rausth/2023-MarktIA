import { ServiceType } from "@/enums/serviceType";
import { MOCKED_ADDRESSES } from "./address";
import { MOCKED_USERS } from "./user";

export const MOCKED_SERVICES = [
    {
        id: 0,
        provider: MOCKED_USERS[2],
        address: MOCKED_ADDRESSES[1],
        title: "SERVICE_NAME_1",
        type: ServiceType.PROGRAMACAO_TECNOLOGIA,
        description: "Serviço para formatar PC",
        price: 123.45,
        picpayUser: "enzo.cussuol"
    },
    {
        id: 1,
        provider: MOCKED_USERS[2],
        address: MOCKED_ADDRESSES[0],
        title: "SERVICE_NAME_2",
        type: ServiceType.NEGOCIOS,
        description: "Serviço para consertar geladeira",
        price: 100.00,
        picpayUser: "enzo.cussuol"
    },
    {
        id: 2,
        provider: MOCKED_USERS[2],
        address: MOCKED_ADDRESSES[2],
        title: "SERVICE_NAME_2",
        type: ServiceType.REDACAO_TRADUCAO,
        description: "Serviço para fazer TCC",
        price: 99.99,
        picpayUser: "enzo.cussuol"
    }
]