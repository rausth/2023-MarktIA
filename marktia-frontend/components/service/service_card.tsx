import Avatar from "../common/avatar";

type ServiceCardProps = {
    /**
     * Tipo any por enquanto
     */
    service: any;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="flex items-center bg-green-200 m-5 p-5">
            <div className="w-[96px] h-[96px] rounded-full bg-gray-400">
                <Avatar url={service.imageURL} />
            </div>
            <div className="ml-10">
                <p>{service.name}</p>
            </div>
        </div>
    )
}