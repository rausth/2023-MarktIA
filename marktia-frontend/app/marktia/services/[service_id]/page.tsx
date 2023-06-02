"use client";

import Address from "@/components/common/address";
import Button from "@/components/common/button";
import ScheduleService from "@/components/services/schedule_service";
import ServiceSchedulingCard from "@/components/services/service_scheduling_card";
import ServiceDetails from "@/components/common/service_details";
import { MOCKED_SERVICES } from "@/mocks/service";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import UserInfo from "@/components/common/user_info";
import { Service } from "@/models/service";
import { ServicesController } from "@/controllers/services";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AxiosError, AxiosResponse } from "axios";
import { onError } from "@/configs/axios";
import { enqueueSnackbar } from 'notistack';
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { Scheduling } from "@/models/scheduling";

export default async function ServicePage({ params }: { params: { service_id: string } }) {
    const [service, setService] = useState<Service>(MOCKED_SERVICES[0]);

    const { data: session } = useSession();

    useEffect(() => {
        /**
         * [TODO]
         * Descomentar quando backend estiver pronto
         */
        // if (session) {
        //     ServicesController.getById(params.service_id, session.user.token)
        //         .then((response: AxiosResponse<ServiceResponseDTO>) => setService(response.data as Service))
        //         .catch((error: AxiosError) => onError(enqueueSnackbar, error));
        // }
    }, [session]);

    return (
        <div>
            {service ? (
                <div>
                    <div className="text-2xl flex items-center border-b-2 border-black pb-2">
                        <Button>
                            <Link href={"/marktia/services"}><FaArrowLeft /></Link>
                        </Button>
                        <div className="ml-5"><span>Serviço - {service.title}</span></div>
                    </div>

                    <div className="mx-10">
                        <div className="grid grid-cols-2 border-b-2 border-black">
                            <div className="pt-5 pl-5 border-r-2 border-black">
                                <h1 className="text-xl">Detalhes do Serviço</h1>

                                <ServiceDetails {...{
                                    type: service.type,
                                    description: service.description,
                                    price: service.price,
                                    picpayUser: service.picpayUser
                                }} />
                            </div>
                            <div className="pt-5 pl-5">
                                <h1 className="text-xl">Localização Geográfica</h1>

                                {service.address ? (
                                    <Address address={service.address} />
                                ) : (
                                    <Address address={service.provider.address} />
                                )}
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 border-b-2 border-black">
                            <h1 className="text-xl">Informações do Provedor</h1>

                            <UserInfo user={service.provider} />
                        </div>
                        <div className="w-full p-5 border-b-2 border-black">
                            <h1 className="text-xl mb-2">Agendamentos</h1>

                            <div className="h-44 overflow-y-auto">
                                {service.schedulings.map((scheduling: Scheduling, idx: number) => (
                                    <ServiceSchedulingCard key={idx} {...{
                                        consumerName: scheduling.consumer.name,
                                        status: scheduling.status,
                                        creationDate: scheduling.creationDate
                                    }} />
                                ))}
                            </div>

                            <ScheduleService />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {
                        /**
                         * [TODO]
                         * Tratamento de erro posteriormente
                         * 
                         * Provavelmente, mostrar mensagem de carregamento (testar)
                         */
                    }
                    <p>Serviço não encontrado</p>
                </div>
            )}
        </div>
    )
}