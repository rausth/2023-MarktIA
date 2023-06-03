import AddressInfo from "@/components/common/addressInfo";
import ServiceDetails from "@/components/common/service_details";
import UserInfo from "@/components/common/user_info";
import { Scheduling } from "@/models/scheduling";
import { Service } from "@/models/service";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import ServiceSchedulingCard from "./service_scheduling_card";
import ScheduleService from "./schedule_service";

type ServiceProps = {
    service: Service;
}

export default function ServiceMainComponent({ service }: ServiceProps) {
    return (
        <div>
            <div className="text-2xl flex items-center border-b-2 border-black pb-2">
                <Link href={"/marktia/services"}><FaArrowLeft /></Link>
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
                            <AddressInfo address={service.address} />
                        ) : (
                            <AddressInfo address={service.provider.address} />
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

                    <ScheduleService serviceId={service.id} />
                </div>
            </div>
        </div>
    )
}