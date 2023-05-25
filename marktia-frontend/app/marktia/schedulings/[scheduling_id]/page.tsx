import Button from "@/components/common/button";
import UserInfo from "@/components/common/user_info";
import ServiceDetails from "@/components/common/service_details";
import { MOCKED_SCHEDULINGS } from "@/mocks/scheduling";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import SchedulingSituation from "@/components/schedulings/scheduling_situation";

const fetchScheduling = async (schedulingId: string) => {
    /**
     * Por enquanto, mockando dados
     */
    return MOCKED_SCHEDULINGS[Number(schedulingId)];
}

export default async function SchedulingPage({ params }: { params: { scheduling_id: string } }) {
    const scheduling = await fetchScheduling(params.scheduling_id);

    return (
        <div>
            {scheduling ? (
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

                                <UserInfo user={scheduling.service.provider} />
                            </div>
                            <div className="pt-5 pl-5">
                                <h1 className="text-xl">Informações do Cliente</h1>

                                <UserInfo user={scheduling.consumer} />
                            </div>
                        </div>
                        <div className="pt-5 pl-5 border-b-2 border-black">
                            <h1 className="text-xl">Informações do Serviço</h1>

                            <ServiceDetails {...{
                                type: scheduling.service.type,
                                description: scheduling.service.description,
                                price: scheduling.service.price,
                                picpayUser: scheduling.service.picpayUser
                            }} />
                        </div>
                        <div className="pt-5 pl-5 border-b-2 border-black">
                            <h1 className="text-xl">Andamento</h1>

                            <SchedulingSituation scheduling={scheduling} />
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