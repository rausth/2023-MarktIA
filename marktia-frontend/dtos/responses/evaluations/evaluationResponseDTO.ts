import { Scheduling } from "@/models/scheduling";

export type EvaluationResponseDTO = {
    id: string;
    scheduling: Scheduling;
    rating: number;
    assessment: string;
}