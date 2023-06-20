"use client";

import { useSession } from "next-auth/react";
import Button from "../../common/button";
import { useRouter } from "next/navigation";
import { SchedulingsController } from "@/controllers/schedulings";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { handleError } from "@/utils/errorHandler";

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
                .then(() => enqueueSnackbar("Agendamento criado com sucesso! Vá para a página de agendamentos para acessá-lo.", {
                    variant: "success"
                }))
                .catch((error: AxiosError) => handleError("Ocorreu um erro ao criar o agendamento.", {
                    errors: error.response?.data as any
                }));
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <SnackbarProvider>
            <div className="flex justify-center items-center my-5">
                <div className="text-xl mr-2"><span>Se interessou por esse serviço?</span></div>
                <div><Button color="blue" onClick={() => createScheduling()}>Agendar Serviço</Button></div>
            </div>
        </SnackbarProvider>
    )
}