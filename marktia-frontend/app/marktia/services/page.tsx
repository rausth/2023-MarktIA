"use client";

import Button from "@/components/common/button";
import ServicesFilterModal from "@/components/services/modals/services_filter_modal";
import ServicesList from "@/components/services/services_list";
import { onError } from "@/configs/axios";
import { ServicesController } from "@/controllers/services";
import { MOCKED_SERVICES } from "@/mocks/service";
import { ServiceBasicInfo } from "@/models/service";
import { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { createRef, useEffect, useState } from "react";
import { enqueueSnackbar } from 'notistack';
import { ServiceBasicInfoResponseDTO } from "@/dtos/responses/services/serviceBasicInfoResponseDTO";

export default function ServicesPage() {
    const [services, setServices] = useState<ServiceBasicInfo[]>([]);

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    const [currentExhibitedServices, setCurrentExhibitedServices] = useState(0);
    const availableServices = createRef<HTMLSpanElement>();
    const myServices = createRef<HTMLSpanElement>();

    const { data: session } = useSession();

    useEffect(() => {
        /**
         * [TODO]
         * Descomentar quando backend estiver pronto
         */
        // if (session) {
        //     ServicesController.getAll({
        //         myServices: currentExhibitedServices === 1 ? true : false
        //     }, session.user.token)
        //         .then((response: AxiosResponse<ServiceBasicInfoResponseDTO[]>) => setServices(response.data))
        //         .catch((error: AxiosError) => onError(enqueueSnackbar, error));
        // }

        const fetchServices = async () => {
            /**
             * Por enquanto, mockando dados e usando any
             */

            if (currentExhibitedServices === 0) {
                /**
                 * Pega todos os servicos (menos os meus)
                 */
                setServices(MOCKED_SERVICES);
            } else if (currentExhibitedServices === 1) {
                /**
                 * Pega apenas os meus servicos
                 * Por enquanto, (fingindo esses 2 sao meus)
                 */
                setServices([MOCKED_SERVICES[0], MOCKED_SERVICES[1]]);
            }
        }

        fetchServices();
    }, [session, currentExhibitedServices]);

    const changeCurrentExhibitedServices = (servicesToShow: number) => {
        if (availableServices.current && myServices.current) {
            availableServices.current.className = "cursor-pointer";
            myServices.current.className = "cursor-pointer";

            if (servicesToShow === 0) {
                availableServices.current.className += " text-orange-500";
            } else if (servicesToShow === 1) {
                myServices.current.className += " text-orange-500";
            }

            setCurrentExhibitedServices(servicesToShow);
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