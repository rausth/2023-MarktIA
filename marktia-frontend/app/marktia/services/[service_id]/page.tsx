import Address from "@/components/common/address";
import Button from "@/components/common/button";
import ScheduleService from "@/components/services/schedule_service";
import ServiceSchedulingCard from "@/components/services/service_scheduling_card";
import ServiceDetails from "@/components/common/service_details";
import { MOCKED_SCHEDULINGS } from "@/mocks/scheduling";
import { MOCKED_SERVICES } from "@/mocks/service";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import UserInfo from "@/components/common/user_info";

const fetchService = async (serviceId: string) => {
    /**
     * Por enquanto, mockando dados
     */
    return MOCKED_SERVICES[Number(serviceId)];
}

const fetchSchedulings = async (serviceId: string) => {
    /**
     * Por enquanto, mockando dados
     */
    return MOCKED_SCHEDULINGS;
}

export default async function ServicePage({ params }: { params: { service_id: string } }) {
    const service = await fetchService(params.service_id);
    const schedulings = await fetchSchedulings(params.service_id);

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

                    <div className="grid grid-cols-2 mt-5">
                        <div className="p-5 bg-green-200">
                            <h1 className="text-xl">Detalhes do Serviço</h1>

                            <ServiceDetails {...{
                                type: service.type,
                                description: service.description,
                                price: service.price,
                                picpayUser: service.picpayUser
                            }} />
                        </div>
                        <div className="p-5 bg-red-200">
                            <h1 className="text-xl">Localização Geográfica</h1>

                            {service.address ? (
                                <Address address={service.address} />
                            ) : (
                                <Address address={service.provider.address} />
                            )}
                        </div>
                    </div>
                    <div className="w-full py-2 px-5 bg-yellow-200">
                        <h1 className="text-xl">Informações do Provedor</h1>

                        <UserInfo user={service.provider} />
                    </div>
                    <div className="w-full p-5 bg-blue-200">
                        <h1 className="text-xl mb-2">Agendamentos</h1>

                        <div className="h-48 overflow-y-auto">
                            {schedulings.map((scheduling: any, idx: number) => (
                                <ServiceSchedulingCard scheduling={scheduling} key={idx} />
                            ))}
                        </div>

                        <ScheduleService />
                    </div>
                </div>
            ) : (
                <div>
                    {
                        /**
                         * Tratamento de erro posteriormente
                         */
                    }
                    <p>Serviço não encontrado</p>
                </div>
            )}
        </div>
    )
}