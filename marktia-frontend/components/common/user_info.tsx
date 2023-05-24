import Link from "next/link";
import Avatar from "./avatar";
import { FaWhatsapp } from "react-icons/fa";

type UserInfoProps = {
    /**
     * any por enquanto
     */
    user: any;
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <div className="grid grid-cols-2">
            <div className="flex justify-center items-center p-5">
                <div className="w-[96px] h-[96px] rounded-full bg-gray-400">
                    <Avatar url={user.imageURL} />
                </div>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-2 py-2">
                    <div><span>Nome: {user.name}</span></div>
                    <div><span>E-mail: {user.email}</span></div>
                </div>
                <div className="grid grid-cols-2 py-2">
                    <div><span>CPF: {user.cpf}</span></div>
                    <div className="flex items-center">
                        <div className="mr-2"><span>Telefone: {user.telephone}</span></div>
                        <div><Link href={"https://wa.me/55" + user.telephone}><FaWhatsapp /></Link></div>
                    </div>
                </div>
                <div className="py-2"><span>Usuário desde: {user.creationDate.toDateString()}</span></div>
            </div>
        </div>
    )
}