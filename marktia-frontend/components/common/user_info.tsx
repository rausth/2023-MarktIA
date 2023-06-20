import Link from "next/link";
import Avatar from "./avatar";
import { FaWhatsapp } from "react-icons/fa";
import { User } from "@/models/user";
import FormattedCPF from "./formattedData/formatted_cpf";
import FormattedPhoneNumber from "./formattedData/formatted_phone_number";
import FormattedDate from "./formattedData/formatted_date";

type UserInfoProps = {
    user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <div className="grid grid-cols-4">
            <div className="col-span-1 flex justify-center items-center p-5">
                <div className="w-[96px] h-[96px] rounded-full bg-gray">
                    {user.imageURL && <Avatar url={user.imageURL} />}
                </div>
            </div>
            <div className="col-span-3 p-5">
                <div className="grid grid-cols-2 py-2">
                    <div><span>Nome: {user.name}</span></div>
                    <div><span>E-mail: {user.email}</span></div>
                </div>
                <div className="grid grid-cols-2 py-2">
                    <div><span>CPF: <FormattedCPF cpf={user.cpf} /></span></div>
                    <div className="flex items-center">
                        <div className="mr-2"><span>Telefone: <FormattedPhoneNumber phoneNumber={user.telephone} /></span></div>
                        <div><Link href={"https://wa.me/55" + user.telephone} className="text-green-500 hover:text-green-700"><FaWhatsapp /></Link></div>
                    </div>
                </div>
                <div className="py-2"><span>Usuário desde: <FormattedDate date={user.creationDate} /></span></div>
            </div>
        </div>
    )
}