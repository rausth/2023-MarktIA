import { Federation } from "./federation";

export type Address = {
    id: string;
    federation: Federation;
    district: string;
    publicPlace: string;
    number: string;
    complement: string;
}