import { EvaluationRequestDTO } from "../evaluations/evaluationRequestDTO";

export type SchedulingStatusUpdateRequestDTO = {
    userId: string;
    evaluation?: EvaluationRequestDTO;
}