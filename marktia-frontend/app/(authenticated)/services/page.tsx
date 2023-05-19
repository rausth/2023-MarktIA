"use client";

import Button from "@/components/common/button";
import ServicesFilterModal from "@/components/services/modals/services_filter_modal";
import ServiceCard from "@/components/services/service_card";
import { MOCKED_SERVICES } from "@/mocks/service";
import { useEffect, useState } from "react";

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            /**
             * Por enquanto, mockando dados e usando any
             */

            setServices(MOCKED_SERVICES);
        }

        fetchServices();
    }, []);

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
            <div className="p-5">
                {services.map((service: any, idx: number) => (
                    <ServiceCard key={idx} {...{
                        service: service
                    }} />
                ))}
            </div>
        </div>
    )
}