"use client";

import Button from "@/components/common/button";
import { SchedulingStatus } from "@/enums/schedulingStatus";
import { Scheduling } from "@/models/scheduling";
import { useSession } from "next-auth/react";

type ChangeSchedulingStatusProps = {
    scheduling: Scheduling;
    providerId: string;
}

export default function ChangeSchedulingStatus({ scheduling, providerId }: ChangeSchedulingStatusProps) {
    const { data: session } = useSession();

    return (
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
    )
}