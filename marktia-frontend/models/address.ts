import { Federation } from "./federation";

export type Address = {
    id: string;
    federation: Federation;
    publicPlace: string;
    number: number;
    complement: string;
}