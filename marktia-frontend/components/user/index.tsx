"use client";

import { User, UserPersonalData } from "@/models/user";
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
import UserImage from "./user_image";
import { AddressRequestDTO } from "@/dtos/requests/addresses/addressRequestDTO";
import Button from "../common/button";
import { TiUserDelete } from "react-icons/ti";
import UserDeletionModal from "./modals/userDeletionModal";

type UserProps = {
    user?: User;
}

export default function UserMainComponent(userProps: UserProps) {
    const [user, setUser] = useState<User | undefined>(userProps.user);
    const [isUserDeletionModalVisible, setIsUserDeletionModalVisible] = useState(false);

    const { data: session } = useSession();
    const router = useRouter();

    const updateUser = (userRequestDTO: UserRequestDTO, onSuccess?: () => void) => {
        if (session) {
            UsersController.update(session.user.id, userRequestDTO, session.user.token)
                .then((response: AxiosResponse<UserResponseDTO>) => {
                    setUser({
                        ...response.data,
                        userRole: UserRoleUtils.fromNumber(response.data.userRole)
                    });

                    enqueueSnackbar("Usuário atualizado com sucesso.", {
                        variant: "success"
                    });

                    if (onSuccess) {
                        onSuccess();
                    }
                })
                .catch(() => {
                    enqueueSnackbar("Ocorreu um erro ao atualizar o usuário.", {
                        variant: "error"
                    });
                });
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <div>
            {user ? (
                <div>
                    <SnackbarProvider>
                        {isUserDeletionModalVisible && (
                            <UserDeletionModal
                                close={() => setIsUserDeletionModalVisible(false)}
                            />
                        )}

                        <div className="flex justify-between items-center border-b-2 border-black pb-2">
                            <div>
                                <span className="text-2xl">Usuário - {user.name}</span>
                            </div>
                            <div>
                                <Button color="red" onClick={() => setIsUserDeletionModalVisible(true)}>
                                    <div className="flex items-center">
                                        <div className="mr-2"><span>Deletar Conta</span></div>
                                        <div><TiUserDelete /></div>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className="mx-10">
                            <div className="w-full flex justify-center mt-5 border-b-2 border-black pb-2">
                                <UserImage imageURL={user.imageURL} onSubmission={(imageURL: string | null, onSuccess: () => void) => updateUser({
                                    imageURL: imageURL ? imageURL : null,
                                    userRole: UserRoleUtils.toNumber(user.userRole)!,
                                    name: user.name,
                                    email: user.email,
                                    telephone: user.telephone,
                                    cpf: user.cpf,
                                    cnpj: user.cnpj,
                                    address: {
                                        countyId: user.address.federation.county.id.toString(),
                                        district: user.address.district,
                                        publicPlace: user.address.publicPlace,
                                        number: user.address.number,
                                        complement: user.address.complement
                                    }
                                }, onSuccess)} />
                            </div>
                            <div className="grid grid-cols-2 border-b-2 border-black">
                                <div className="p-5 border-r-2 border-black pr-2">
                                    <h1 className="text-xl">Informações Pessoais</h1>

                                    <UserPersonalInfo user={user} onSubmission={(userPersonalData: UserPersonalData, onSuccess: () => void) => updateUser({
                                        imageURL: user.imageURL ? user.imageURL : null,
                                        ...userPersonalData,
                                        address: {
                                            countyId: user.address.federation.county.id.toString(),
                                            district: user.address.district,
                                            publicPlace: user.address.publicPlace,
                                            number: user.address.number,
                                            complement: user.address.complement
                                        }
                                    }, onSuccess)} />
                                </div>
                                <div className="p-5">
                                    <h1 className="text-xl">Endereço</h1>

                                    <UserAddressInfo address={user.address} onSubmission={(address: AddressRequestDTO, onSuccess: () => void) => updateUser({
                                        imageURL: user.imageURL ? user.imageURL : null,
                                        userRole: UserRoleUtils.toNumber(user.userRole)!,
                                        name: user.name,
                                        email: user.email,
                                        telephone: user.telephone,
                                        cpf: user.cpf,
                                        cnpj: user.cnpj,
                                        address: address
                                    }, onSuccess)} />
                                </div>
                            </div>
                        </div>
                    </SnackbarProvider>
                </div>
            ) : (
                <div className="h-full flex justify-center items-center text-xl">
                    <div><span>Oops... Usuário não encontrado!</span></div>
                </div>
            )}
        </div>
    )
}