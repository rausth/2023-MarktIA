"use client";

import { User, UserPersonalData } from "@/models/user";
import UserAddressInfo from "./user_address_info";
import { UserRequestDTO } from "@/dtos/requests/users/userRequestDTO";
import { useRouter } from "next/navigation";
import { UsersController } from "@/controllers/users";
import { useContext, useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { UserResponseDTO } from "@/dtos/responses/users/userResponseDTO";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import UserPersonalInfo from "./user_personal_info";
import { UserRoleUtils } from "@/enums/userRole";
import UserImage from "./user_image";
import { AddressRequestDTO } from "@/dtos/requests/addresses/addressRequestDTO";
import Button from "../common/button";
import { TiUserDelete } from "react-icons/ti";
import UserDeletionModal from "./modals/userDeletionModal";
import { handleError } from "@/utils/errorHandler";
import { AuthContext } from "@/contexts/AuthContext";

export default function UserMainComponent() {
    const [fullInfoUser, setFullInfoUser] = useState<User | null>(null);
    const [isUserDeletionModalVisible, setIsUserDeletionModalVisible] = useState(false);

    const { token, user } = useContext(AuthContext);
    const router = useRouter();

    const updateUser = (userRequestDTO: UserRequestDTO, onSuccess?: () => void) => {
        if (token && user) {
            UsersController.update(user.id, userRequestDTO, token)
                .then((response: AxiosResponse<UserResponseDTO>) => {
                    enqueueSnackbar("Usuário atualizado com sucesso. Caso tenha alterado a classificação, relogue.", {
                        variant: "success"
                    });

                    if (onSuccess) {
                        onSuccess();
                    }

                    setFullInfoUser({
                        ...response.data,
                        userRole: UserRoleUtils.fromNumber(response.data.userRole)
                    });
                })
                .catch((error: AxiosError) => handleError("Ocorreu um erro ao atualizar o usuário.", {
                    errors: error.response?.data as any
                }));
        }
    }

    useEffect(() => {
        if (token && user) {
            UsersController.getById(user.id, token)
                .then((response: AxiosResponse<UserResponseDTO>) => setFullInfoUser({
                    ...response.data,
                    userRole: UserRoleUtils.fromNumber(response.data.userRole)
                }))
                .catch(() => {})
        }
    }, []);

    return (
        <div>
            {fullInfoUser ? (
                <div>
                    <SnackbarProvider>
                        {isUserDeletionModalVisible && (
                            <UserDeletionModal
                                close={() => setIsUserDeletionModalVisible(false)}
                            />
                        )}

                        <div className="flex justify-between items-center border-b-2 border-black pb-2">
                            <div>
                                <span className="text-2xl">Usuário - {fullInfoUser.name}</span>
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
                                <UserImage imageURL={fullInfoUser.imageURL} onSubmission={(imageURL: string | null, onSuccess: () => void) => updateUser({
                                    imageURL: imageURL ? imageURL : null,
                                    userRole: UserRoleUtils.toNumber(fullInfoUser.userRole)!,
                                    name: fullInfoUser.name,
                                    email: fullInfoUser.email,
                                    telephone: fullInfoUser.telephone,
                                    cpf: fullInfoUser.cpf,
                                    cnpj: fullInfoUser.cnpj,
                                    address: {
                                        state: fullInfoUser.address.state,
                                        city: fullInfoUser.address.city,
                                        district: fullInfoUser.address.district,
                                        publicPlace: fullInfoUser.address.publicPlace,
                                        number: fullInfoUser.address.number,
                                        complement: fullInfoUser.address.complement
                                    }
                                }, onSuccess)} />
                            </div>
                            <div className="grid grid-cols-2 border-b-2 border-black">
                                <div className="p-5 border-r-2 border-black pr-2">
                                    <h1 className="text-xl">Informações Pessoais</h1>

                                    <UserPersonalInfo user={fullInfoUser} onSubmission={(userPersonalData: UserPersonalData, onSuccess: () => void) => updateUser({
                                        imageURL: fullInfoUser.imageURL ? fullInfoUser.imageURL : null,
                                        ...userPersonalData,
                                        address: {
                                            state: fullInfoUser.address.state,
                                            city: fullInfoUser.address.city,
                                            district: fullInfoUser.address.district,
                                            publicPlace: fullInfoUser.address.publicPlace,
                                            number: fullInfoUser.address.number,
                                            complement: fullInfoUser.address.complement
                                        }
                                    }, onSuccess)} />
                                </div>
                                <div className="p-5">
                                    <h1 className="text-xl">Endereço</h1>

                                    <UserAddressInfo address={fullInfoUser.address} onSubmission={(address: AddressRequestDTO, onSuccess: () => void) => updateUser({
                                        imageURL: fullInfoUser.imageURL ? fullInfoUser.imageURL : null,
                                        userRole: UserRoleUtils.toNumber(fullInfoUser.userRole)!,
                                        name: fullInfoUser.name,
                                        email: fullInfoUser.email,
                                        telephone: fullInfoUser.telephone,
                                        cpf: fullInfoUser.cpf,
                                        cnpj: fullInfoUser.cnpj,
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