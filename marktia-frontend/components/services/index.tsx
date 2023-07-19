"use client";

import { ServiceBasicInfo } from "@/models/service";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import Button from "../common/button";
import ServicesFilterModal from "./modals/services_filter_modal";
import ServicesList from "./services_list";
import { ServicesController } from "@/controllers/services";
import { AxiosError, AxiosResponse } from "axios";
import { ServiceBasicInfoResponseDTO } from "@/dtos/responses/services/serviceBasicInfoResponseDTO";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ServicesFilter } from "@/utils/servicesFilter";
import NewServiceModal from "./modals/new_service_modal";
import { useRouter } from "next/navigation";
import { UserRole } from "@/enums/userRole";
import { handleError } from "@/utils/errorHandler";
import { AuthContext } from "@/contexts/AuthContext";

type ServicesProps = {
    services: ServiceBasicInfo[];
}

export default function ServicesMainComponent(servicesProps: ServicesProps) {
    const [services, setServices] = useState<ServiceBasicInfo[]>(servicesProps.services);

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isNewServiceModalVisible, setIsNewServiceModalVisible] = useState(false);

    const [currentExhibitedServices, setCurrentExhibitedServices] = useState(0);
    const availableServices = createRef<HTMLSpanElement>();
    const myServices = createRef<HTMLSpanElement>();

    const { token, user } = useContext(AuthContext);
    const router = useRouter();

    const isFirstRender = useRef(true);

    const [servicesFilter, setServicesFilter] = useState<ServicesFilter>({
        providerId: null,
        name: null,
        type: null,
        state: null,
        city: null
    });

    const fetchServices = () => {
        if (token) {
            ServicesController.getAll(servicesFilter, token)
                .then((response: AxiosResponse<ServiceBasicInfoResponseDTO[]>) => {
                    setServices(response.data);

                    enqueueSnackbar("Serviços atualizados com sucesso.", { variant: "success" });
                })
                .catch((error: AxiosError) => handleError("Houve um erro ao atualizar os serviços.", {
                    errors: error.response?.data as any
                }));
        } else {
            router.push("/auth/login");
        }
    }

    useEffect(() => {
        if (user) {
            setServicesFilter({
                ...servicesFilter,
                providerId: currentExhibitedServices === 1 ? user.id : null
            });
        } else {
            router.push("/auth/login");
        }
    }, [currentExhibitedServices]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            fetchServices();
        }
    }, [servicesFilter]);

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
        <SnackbarProvider>
            <div>
                {isFilterModalVisible && (<ServicesFilterModal
                    onSubmission={(name: string | null, type: number | null, state: string | null, city: string | null) => setServicesFilter({
                        ...servicesFilter,
                        name: name,
                        type: type,
                        state: state,
                        city: city
                    })}
                    close={() => setIsFilterModalVisible(false)}
                />)}

                {isNewServiceModalVisible && (<NewServiceModal
                    onSubmission={(serviceTitle: string) => enqueueSnackbar(`Serviço de nome ${serviceTitle} criado com sucesso! Atualize a página para acessá-lo`,
                        { variant: "success" })}
                    close={() => setIsNewServiceModalVisible(false)}
                />)}

                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                    <div>
                        <span className="text-2xl">Serviços</span>
                    </div>
                    <div className="flex justify-end">
                        <Button color="blue" className="mr-2" onClick={() => setIsFilterModalVisible(true)}>Filtrar</Button>
                        {UserRole.PROVIDER === user?.userRole && (
                            <Button color="blue" className="ml-2" onClick={() => setIsNewServiceModalVisible(true)}>Novo</Button>
                        )}
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
        </SnackbarProvider>
    )
}