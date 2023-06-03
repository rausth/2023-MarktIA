"use client";

import { ServiceBasicInfo } from "@/models/service";
import { createRef, useState } from "react";
import Button from "../common/button";
import { useSession } from "next-auth/react";
import ServicesFilterModal from "./modals/services_filter_modal";
import ServicesList from "./services_list";
import { ServicesController } from "@/controllers/services";
import { AxiosError, AxiosResponse } from "axios";
import { ServiceBasicInfoResponseDTO } from "@/dtos/responses/services/serviceBasicInfoResponseDTO";
import { MOCKED_SERVICES } from "@/mocks/service";
import { enqueueSnackbar } from "notistack";
import { ServicesFilter } from "@/utils/servicesFilter";

type ServicesProps = {
    services: ServiceBasicInfo[];
}

export default function ServicesMainComponent(servicesProps: ServicesProps) {
    const [services, setServices] = useState<ServiceBasicInfo[]>(servicesProps.services);

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    const availableServices = createRef<HTMLSpanElement>();
    const myServices = createRef<HTMLSpanElement>();

    const { data: session } = useSession();

    const fetchServices = (servicesFilter: ServicesFilter) => {
        /**
         * [TODO]
         * Descomentar quando backend estiver pronto
         */
        // if (session) {
        //     ServicesController.getAll(servicesFilter, session.user.token)
        //         .then((response: AxiosResponse<ServiceBasicInfoResponseDTO[]>) => setServices(response.data))
        //         .catch((error: AxiosError) => enqueueSnackbar("Houve um erro ao atualizar os serviços.", { variant: "error" }));
        // }

        setServices(MOCKED_SERVICES);
    }

    const changeCurrentExhibitedServices = (servicesToShow: number) => {
        if (availableServices.current && myServices.current) {
            availableServices.current.className = "cursor-pointer";
            myServices.current.className = "cursor-pointer";

            if (servicesToShow === 0) {
                availableServices.current.className += " text-orange-500";
            } else if (servicesToShow === 1) {
                myServices.current.className += " text-orange-500";
            }

            fetchServices({
                myServices: servicesToShow === 0 ? false : true
            });
        }
    }

    return (
        <div>
            {isFilterModalVisible && (<ServicesFilterModal close={() => setIsFilterModalVisible(false)} />)}

            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                    <span className="text-2xl">Serviços</span>
                </div>
                <div className="flex justify-end">
                    <Button className="mr-2" onClick={() => setIsFilterModalVisible(true)}>Filtrar</Button>
                    <Button className="ml-2">Novo</Button>
                </div>
            </div>

            <div className="mx-10">
                <div className="text-lg flex justify-around border-b-2 border-black p-2 mt-5">
                    <span ref={availableServices} className="cursor-pointer text-orange-500" onClick={() => changeCurrentExhibitedServices(0)}>Serviços Disponíveis</span>
                    <span ref={myServices} className="cursor-pointer" onClick={() => changeCurrentExhibitedServices(1)}>Meus Serviços</span>
                </div>
                <ServicesList services={services} />
            </div>
        </div>
    )
}