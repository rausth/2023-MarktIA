import { Evaluation } from "@/models/evaluation";

type EvaluationCardProps = {
    evaluation: Evaluation;
}

export default function EvaluationCard({ evaluation }: EvaluationCardProps) {
    return (
        <div className="m-5 bg-blue-dark text-white rounded-md p-5">
            <div><span>Nota: {evaluation.rating}</span></div>
            <div className="break-words"><span>Comentário: {evaluation.assessment}</span></div>
        </div>
    )
}