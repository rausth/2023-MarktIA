"use client";

import Button from "@/components/common/button";
import UserInfo from "@/components/common/user_info";
import ServiceDetails from "@/components/common/service_details";
import { MOCKED_SCHEDULINGS } from "@/mocks/scheduling";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import SchedulingSituation from "@/components/schedulings/scheduling_situation";
import { useEffect, useState } from "react";
import { Scheduling } from "@/models/scheduling";
import { useSession } from "next-auth/react";
import { SchedulingsController } from "@/controllers/schedulings";
import { AxiosError, AxiosResponse } from "axios";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { onError } from "@/configs/axios";
import { enqueueSnackbar } from 'notistack';
import { Service } from "@/models/service";
import { ServicesController } from "@/controllers/services";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { MOCKED_SERVICES } from "@/mocks/service";

export default async function SchedulingPage({ params }: { params: { scheduling_id: string } }) {
    const [scheduling, setScheduling] = useState<Scheduling>(MOCKED_SCHEDULINGS[0]);
    const [service, setService] = useState<Service>(MOCKED_SERVICES[0]);

    const { data: session } = useSession();

    useEffect(() => {
        /**
         * [TODO]
         * Descomentar quando backend estiver pronto
         */
        // if (session) {
        //     SchedulingsController.getById(params.scheduling_id, session.user.token)
        //         .then((response: AxiosResponse<SchedulingResponseDTO>) => setScheduling(response.data as Scheduling))
        //         .catch((error: AxiosError) => onError(enqueueSnackbar, error));
        // }
    }, [session]);

    useEffect(() => {
        /**
         * [TODO]
         * Descomentar quando backend estiver pronto
         */
        // if (scheduling && session) {
        //     ServicesController.getById(scheduling.serviceId, session.user.token)
        //         .then((response: AxiosResponse<ServiceResponseDTO>) => setService(response.data as Service))
        //         .catch((error: AxiosError) => onError(enqueueSnackbar, error));
        // }
    }, [scheduling]);

    return (
        <div>
            {(scheduling && service) ? (
                <div>
                    <div className="text-2xl flex items-center border-b-2 border-black pb-2">
                        <Button>
                            <Link href={"/marktia/schedulings"}><FaArrowLeft /></Link>
                        </Button>
                        <div className="ml-5"><span>Agendamento</span></div>
                    </div>

                    <div className="mx-10">
                        <div className="grid grid-cols-2 border-b-2 border-black">
                            <div className="pt-5 pl-5 border-r-2 border-black">
                                <h1 className="text-xl">Informações do Provedor</h1>

                                <UserInfo user={service.provider} />
                            </div>
                            <div className="pt-5 pl-5">
                                <h1 className="text-xl">Informações do Cliente</h1>

                                <UserInfo user={scheduling.consumer} />
                            </div>
                        </div>
                        <div className="pt-5 pl-5 border-b-2 border-black">
                            <h1 className="text-xl">Informações do Serviço</h1>

                            <ServiceDetails {...{
                                type: service.type,
                                description: service.description,
                                price: service.price,
                                picpayUser: service.picpayUser
                            }} />
                        </div>
                        <div className="pt-5 pl-5 border-b-2 border-black">
                            <h1 className="text-xl">Andamento</h1>

                            <SchedulingSituation scheduling={scheduling} providerId={service.provider.id} />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {
                        /**
                         * Tratamento de erro posteriormente
                         */
                    }
                    <p>Agendamento não encontrado</p>
                </div>
            )}
        </div>
    )
}