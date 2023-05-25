"use client";

import Address from "@/components/common/address";
import Avatar from "@/components/common/avatar";
import Button from "@/components/common/button";
import UserAddressInfo from "@/components/user/user_address_info";
import UserPersonalInfo from "@/components/user/user_personal_info";
import { useSession } from "next-auth/react";

export default function UserPage() {
    const { data: session } = useSession();

    return (
        <div>
            {session?.user ? (
                <div>
                    <div className="flex justify-between items-center border-b-2 border-black pb-2">
                        <div>
                            <span className="text-2xl">Usuário - {session.user.name}</span>
                        </div>
                    </div>

                    <div className="mx-10">
                    <div className="w-full flex justify-center mt-5 border-b-2 border-black pb-2">
                        <div className="grid justify-items-center">
                            <div className="w-[160px] h-[160px] rounded-full">
                                <Avatar url={session.user.imageURL} />
                            </div>
                            <div className="my-2"><Button onClick={() => { }}>Alterar Imagem</Button></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-b-2 border-black">
                        <div className="p-5 border-r-2 border-black pr-2">
                            <h1 className="text-xl">Informações Pessoais</h1>

                            <UserPersonalInfo user={session.user} />
                        </div>
                        <div className="p-5">
                            <h1 className="text-xl">Endereço</h1>

                            <UserAddressInfo address={session.user.address} />
                        </div>
                    </div>
                    </div>
                </div>
            ) : (
                <div>
                    {
                        /**
                         * Tratamento de erro posteriormente
                         */
                    }
                    <p>Usuário não encontrado</p>
                </div>
            )}

        </div>
    )
}