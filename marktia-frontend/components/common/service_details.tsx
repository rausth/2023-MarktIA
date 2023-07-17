import { ServiceType } from "@/enums/serviceType"
import Link from "next/link";
import { SiPicpay } from "react-icons/si";
import FormattedMoney from "./formattedData/formatted_money";

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
            <div className="py-2"><span>Preço: <FormattedMoney money={price} /></span></div>
            <div className="flex items-center">
                <div className="py-2 mr-2"><span>Usuário do PicPay para Pagamento: {picpayUser}</span></div>
                <div><Link href={"https://picpay.me/" + picpayUser} className="text-green-500 hover:text-green-700"><SiPicpay /></Link></div>
            </div>
        </div>
    )
}