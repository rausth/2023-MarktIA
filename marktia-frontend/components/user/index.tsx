"use client";

import { User, UserPersonalData } from "@/models/user";
import Avatar from "../common/avatar";
import Button from "../common/button";
import UserAddressInfo from "./user_address_info";
import { UserRequestDTO } from "@/dtos/requests/users/userRequestDTO";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UsersController } from "@/controllers/users";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { UserResponseDTO } from "@/dtos/responses/users/userResponseDTO";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import UserPersonalInfo from "./user_personal_info";
import { UserRoleUtils } from "@/enums/userRole";
import { Address } from "@/models/address";
import UserImage from "./user_image";

type UserProps = {
    user: User;
}

export default function UserMainComponent(userProps: UserProps) {
    const [user, setUser] = useState<User>(userProps.user);

    const {data: session} = useSession();
    const router = useRouter();

    const updateUser = (userRequestDTO: UserRequestDTO) => {
        if (session) {
            UsersController.update(session.user.id, userRequestDTO, session.user.token)
                .then((response: AxiosResponse<UserResponseDTO>) => setUser({
                    ...response.data,
                    role: UserRoleUtils.fromNumber(response.data.role)
                }))
                .catch(() => enqueueSnackbar("Ocorreu um erro ao atualizar o usuário.", {
                    variant: "error"
                }));
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <SnackbarProvider>
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                    <span className="text-2xl">Usuário - {user.name}</span>
                </div>
            </div>

            <div className="mx-10">
                <div className="w-full flex justify-center mt-5 border-b-2 border-black pb-2">
                    <UserImage imageURL={user.imageURL} onSubmission={(imageURL: string | null) => updateUser({
                        ...user,
                        addressId: user.address.id,
                        imageURL: imageURL ? imageURL : undefined
                    })} />
                </div>
                <div className="grid grid-cols-2 border-b-2 border-black">
                    <div className="p-5 border-r-2 border-black pr-2">
                        <h1 className="text-xl">Informações Pessoais</h1>

                        <UserPersonalInfo user={user} onSubmission={(userPersonalData: UserPersonalData) => updateUser({
                            ...user,
                            ...userPersonalData,
                            addressId: user.address.id
                        })} />
                    </div>
                    <div className="p-5">
                        <h1 className="text-xl">Endereço</h1>

                        <UserAddressInfo address={user.address} onSubmission={(address: Address) => updateUser({
                            ...user,
                            addressId: address.id
                        })} />
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    )
}