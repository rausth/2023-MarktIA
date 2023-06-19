import ServiceDetails from "@/components/common/service_details";
import UserInfo from "@/components/common/user_info";
import { Scheduling } from "@/models/scheduling"
import { Service } from "@/models/service";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import SchedulingSituation from "./scheduling_situation";

type SchedulingProps = {
    scheduling?: Scheduling;
    service?: Service;
}

export default function SchedulingMainComponent({ scheduling, service }: SchedulingProps) {
    return (
        <div>
            {(scheduling && service) ? (
                <div>
                    <div className="text-2xl flex items-center border-b-2 border-black pb-2">
                        <Link href={"/marktia/schedulings"} className="text-white hover:text-blue-light"><FaArrowLeft /></Link>
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

                            <SchedulingSituation scheduling={scheduling} providerId={service.provider.id} picpayUser={service.picpayUser} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex justify-center items-center text-xl">
                    <div><span>Oops... Agendamento não encontrado!</span></div>
                </div>
            )}
        </div>
    )
}