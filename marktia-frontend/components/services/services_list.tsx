import { ServiceBasicInfo } from "@/models/service";
import ServiceCard from "./service_card";

type ServicesListProps = {
    services: Array<ServiceBasicInfo>;
}

export default function ServicesList({ services }: ServicesListProps) {
    return (
        <div className="h-[44rem] p-5 mt-5 overflow-y-auto">
            {services.map((service: any, idx: number) => (
                <ServiceCard key={idx} {...{
                    service: service
                }} />
            ))}
        </div>
    )
}