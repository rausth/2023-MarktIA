"use client";

import { useSession } from "next-auth/react";
import Button from "../../common/button";
import { useRouter } from "next/navigation";
import { SchedulingsController } from "@/controllers/schedulings";
import { AxiosResponse } from "axios";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

type ScheduleServiceProps = {
    serviceId: string;
}

export default function ScheduleService({ serviceId }: ScheduleServiceProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const createScheduling = () => {
        if (session) {
            SchedulingsController.create({
                serviceId: serviceId,
                consumerId: session.user.id
            }, session.user.token)
                .then((response: AxiosResponse<SchedulingResponseDTO>) => enqueueSnackbar("Agendamento criado com sucesso! Vá para a página de agendamentos para acessá-lo.", {
                    variant: "success"
                }))
                .catch(() => enqueueSnackbar("Ocorreu um erro ao criar o agendamento.", {
                    variant: "error"
                }));
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <SnackbarProvider>
            <div className="flex justify-center items-center my-5">
                <div className="text-xl"><span>Se interessou por esse serviço?</span></div>
                <div><Button onClick={() => createScheduling()}>Agendar Serviço</Button></div>
            </div>
        </SnackbarProvider>
    )
}