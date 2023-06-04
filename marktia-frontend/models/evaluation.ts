import { Scheduling } from "./scheduling";

export type Evaluation = {
    id: string;
    scheduling: Scheduling;
    rating: number;
    assessment: string;
}