"use client";

import Button from "../../common/button";
import { useRouter } from "next/navigation";
import { SchedulingsController } from "@/controllers/schedulings";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { handleError } from "@/utils/errorHandler";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

type ScheduleServiceProps = {
    serviceId: string;
}

export default function ScheduleService({ serviceId }: ScheduleServiceProps) {
    const { token, user } = useContext(AuthContext);
    const router = useRouter();

    const createScheduling = () => {
        if (token && user) {
            SchedulingsController.create({
                serviceId: serviceId,
                consumerId: user.id
            }, token)
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