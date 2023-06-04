import Avatar from "../common/avatar";
import Button from "../common/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ServiceBasicInfo } from "@/models/service";
import Link from "next/link";

type ServiceCardProps = {
    service: ServiceBasicInfo;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="flex justify-between items-center rounded-md m-5 p-5 bg-blue-dark text-white">
            <div className="flex items-center">
                <div className="w-[96px] h-[96px] rounded-full bg-gray">
                    {service.provider.imageURL && <Avatar url={service.provider.imageURL} />}
                </div>
                <div className="ml-10">
                    <div><span>Título do Serviço: {service.title}</span></div>
                    <div><span>Prestador: {service.provider.name}</span></div>
                </div>
            </div>
            <div>
                <Link href={`/marktia/services/${service.id}`} className="hover:text-blue-light">
                    <div className="flex items-center">
                        <span className="mr-5">Detalhes</span>
                        <span><FaExternalLinkAlt /></span>
                    </div>
                </Link>
            </div>
        </div>
    )
}