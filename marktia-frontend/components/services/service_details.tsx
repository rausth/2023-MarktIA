import { ServiceType } from "@/enums/serviceType"

type ServiceDetailsProps = {
    type: ServiceType;
    description: string;
    price: number;
    picpayUser: string;
}

export default function ServiceDetails({ type, description, price, picpayUser }: ServiceDetailsProps) {
    return (
        <div>
            <div className="py-2"><span>Tipo: {type}</span></div>
            <div className="py-2"><span>Descrição: {description}</span></div>
            <div className="py-2"><span>Preço: {price}</span></div>
            <div className="py-2"><span>Usuário do PicPay para Pagamento: {picpayUser}</span></div>
        </div>
    )
}