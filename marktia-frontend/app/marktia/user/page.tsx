"use client";

import Address from "@/components/common/address";
import Avatar from "@/components/common/avatar";
import Button from "@/components/common/button";
import UserAddressInfo from "@/components/user/user_address_info";
import UserPersonalInfo from "@/components/user/user_personal_info";
import { onError } from "@/configs/axios";
import { UsersController } from "@/controllers/users";
import { UserResponseDTO } from "@/dtos/responses/users/userResponseDTO";
import { User } from "@/models/user";
import { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from 'notistack';
import { MOCKED_USERS } from "@/mocks/user";

export default function UserPage() {
    const [user, setUser] = useState<User>();

    const { data: session } = useSession();

    useEffect(() => {
        /**
         * [TODO]
         * Descomentar quando backend estiver pronto
         */
        // if (session) {
        //     UsersController.getById(session.user.id, session.user.token)
        //         .then((response: AxiosResponse<UserResponseDTO>) => setUser(response.data as User))
        //         .catch((error: AxiosError) => onError(enqueueSnackbar, error))
        // }

        setUser(MOCKED_USERS[0]);
    }, [session]);

    return (
        <div>
            {user ? (
                <div>
                    <div className="flex justify-between items-center border-b-2 border-black pb-2">
                        <div>
                            <span className="text-2xl">Usuário - {user.name}</span>
                        </div>
                    </div>

                    <div className="mx-10">
                        <div className="w-full flex justify-center mt-5 border-b-2 border-black pb-2">
                            <div className="grid justify-items-center">
                                <div className="w-[160px] h-[160px] rounded-full">
                                    <Avatar url={user.imageURL} />
                                </div>
                                <div className="my-2"><Button onClick={() => { }}>Alterar Imagem</Button></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 border-b-2 border-black">
                            <div className="p-5 border-r-2 border-black pr-2">
                                <h1 className="text-xl">Informações Pessoais</h1>

                                <UserPersonalInfo user={user} />
                            </div>
                            <div className="p-5">
                                <h1 className="text-xl">Endereço</h1>

                                <UserAddressInfo address={user.address} />
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