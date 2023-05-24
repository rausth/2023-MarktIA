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
                    <div className="grid grid-cols-2 p-5 bg-purple-200">
                        <div className="bg-green-200">
                            <h1 className="text-xl">Informações do Provedor</h1>

                            <UserInfo user={scheduling.service.provider} />
                        </div>
                        <div className="bg-blue-200">
                            <h1 className="text-xl">Informações do Cliente</h1>

                            <UserInfo user={scheduling.consumer} />
                        </div>
                    </div>
                    <div className="p-5 bg-yellow-200">
                        <h1 className="text-xl">Informações do Serviço</h1>

                        <ServiceDetails {...{
                            type: scheduling.service.type,
                            description: scheduling.service.description,
                            price: scheduling.service.price,
                            picpayUser: scheduling.service.picpayUser
                        }} />
                    </div>
                    <div className="p-5 bg-red-200">
                        <h1 className="text-xl">Andamento</h1>

                        <SchedulingSituation scheduling={scheduling} />
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