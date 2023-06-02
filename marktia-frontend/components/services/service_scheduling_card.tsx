import FormattedDate from "../common/formattedData/formatted_date";
import { SchedulingStatus } from "@/enums/schedulingStatus";

type ServiceSchedulingCardProps = {
    consumerName: string;
    status: SchedulingStatus;
    creationDate: string;
}

export default function ServiceSchedulingCard({ consumerName, status, creationDate }: ServiceSchedulingCardProps) {
    return (
        <div className="m-5 bg-red-200">
            <div className="grid grid-cols-2 py-2">
                <div><span>Cliente: {consumerName}</span></div>
                <div><span>Status: {status}</span></div>
            </div>
            <div className="py-2"><span>Data de Criação: <FormattedDate date={creationDate} /></span></div>
        </div>
    )
}