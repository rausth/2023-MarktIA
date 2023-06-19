import { Scheduling } from "@/models/scheduling";
import FormattedDate from "../../common/formattedData/formatted_date";
import ChangeSchedulingStatus from "./change_scheduling_status";

type SchedulingSituationProps = {
    scheduling: Scheduling;
    providerId: string;
    picpayUser: string;
}

export default function SchedulingSituation({ scheduling, providerId, picpayUser }: SchedulingSituationProps) {
    return (
        <div className="w-full p-5">
            <div className="py-2"><span>Status: {scheduling.status}</span></div>
            <div className="py-2"><span>Data de Criação: <FormattedDate date={scheduling.creationDate} /></span></div>
            <div className="py-2"><span>Data de Finalização: {scheduling.completionDate ? <FormattedDate date={scheduling.completionDate} /> : ""}</span></div>

            <ChangeSchedulingStatus scheduling={scheduling} providerId={providerId} picpayUser={picpayUser} />
        </div>
    )
}