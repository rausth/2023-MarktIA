import Button from "@/components/common/button";
import ServiceCard from "@/components/service/service_card";
import { MOCKED_SERVICES } from "@/mocks/service";

const fetchServices = async () => {
    /**
     * Por enquanto, mockando dados
     */

    return MOCKED_SERVICES;
}

export default async function ServicePage() {
    const services = await fetchServices();

    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                    <span className="text-2xl">Serviços</span>
                </div>
                <div className="flex justify-end">
                    <Button className="mr-2">Filtrar</Button>
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