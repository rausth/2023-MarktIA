import Button from "@/components/common/button";
import { MOCKED_SERVICES } from "@/mocks/service";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const fetchService = async (serviceId: string) => {
    /**
     * Por enquanto, mockando dados
     */
    return MOCKED_SERVICES[Number(serviceId)]
}

export default async function ServicePage({ params }: { params: { service_id: string } }) {
    const service = await fetchService(params.service_id);

    return (
        <div>
            {service ? (
                <div className="text-2xl flex items-center border-b-2 border-black pb-2">
                    <Button>
                        <Link href={"/services"}><FaArrowLeft /></Link>
                    </Button>
                    <div className="ml-5"><span>Serviço - {service.name}</span></div>
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