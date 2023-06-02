"use client";

import { SchedulingStatus } from "@/enums/schedulingStatus"
import { useSession } from "next-auth/react";
import Button from "../common/button";
import { Scheduling } from "@/models/scheduling";
import FormattedDate from "../common/formattedData/formatted_date";

type SchedulingSituationProps = {
    scheduling: Scheduling;
    providerId: string;
}

export default function SchedulingSituation({ scheduling, providerId }: SchedulingSituationProps) {
    const { data: session } = useSession();

    return (
        <div className="p-5">
            <div className="py-2"><span>Status: {scheduling.status}</span></div>
            <div className="py-2"><span>Data de Criação: <FormattedDate date={scheduling.creationDate} /></span></div>
            <div className="py-2"><span>Data de Finalização: {scheduling.completionDate ? <FormattedDate date={scheduling.completionDate} /> : ""}</span></div>

            <div className="text-center">
                {scheduling.status === SchedulingStatus.OPENED && (
                    <div>
                        {session?.user.id === providerId ? (
                            <div className="flex items-center">
                                <div className="py-2 mr-2"><span>Você é o provedor desse agendamento</span></div>
                                <div><Button onClick={() => { }}>Marcar como entregue</Button></div>
                            </div>
                        ) : (
                            <div className="py-2"><span>Aguardando até que o provedor marque o agendamento como entregue</span></div>
                        )}
                    </div>
                )}

                {scheduling.status === SchedulingStatus.DELIVERED && (
                    <div>
                        {session?.user.id === scheduling.consumer.id ? (
                            <div className="flex items-center">
                                <div className="py-2 mr-2"><span>Você é o cliente desse agendamento</span></div>
                                <div><Button onClick={() => { }}>Marcar como finalizado</Button></div>
                            </div>
                        ) : (
                            <div className="py-2"><span>Aguardando até que o cliente marque o agendamento como finalizado</span></div>
                        )}
                    </div>
                )}

                {scheduling.status === SchedulingStatus.FINISHED && (
                    <div className="py-2"><span>Agendamento finalizado!</span></div>
                )}
            </div>
        </div>
    )
}