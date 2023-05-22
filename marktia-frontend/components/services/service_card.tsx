"use client";

import { useRouter } from "next/navigation";
import Avatar from "../common/avatar";
import Button from "../common/button";
import { FaExternalLinkAlt } from "react-icons/fa";

type ServiceCardProps = {
    /**
     * Tipo any por enquanto
     */
    service: any;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center bg-green-200 rounded-md m-5 p-5">
            <div className="flex items-center">
                <div className="w-[96px] h-[96px] rounded-full bg-gray-400">
                    <Avatar url={service.imageURL} />
                </div>
                <div className="ml-10">
                    <div><span>Nome do Serviço: {service.name}</span></div>
                    <div><span>Prestador: {service.responsible.name}</span></div>
                </div>
            </div>
            <div>
                <Button onClick={() => router.push("/marktia/services/" + service.id)}>
                    <div className="flex items-center">
                        <span className="mr-5">Detalhes </span>
                        <span><FaExternalLinkAlt /></span>
                    </div>
                </Button>
            </div>
        </div>
    )
}