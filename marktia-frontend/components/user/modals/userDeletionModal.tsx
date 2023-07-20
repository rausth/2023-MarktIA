"use client";

import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { AuthContext } from "@/contexts/AuthContext";
import { UsersController } from "@/controllers/users";
import { handleError } from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation';
import { useContext } from "react";

type UserDeletionModalProps = {
    close: () => void;
}

export default function UserDeletionModal({ close }: UserDeletionModalProps) {
    const { token, user, signOut } = useContext(AuthContext);
    const router = useRouter();

    const handleUserDeletion = () => {
        if (token && user) {
            UsersController.delete(user.id, token)
                .then(() => signOut())
                .catch((error: AxiosError) => handleError("Ocorreu um erro ao deletar o usuário.", {
                    errors: error.response?.data as any
                }));
        }
    }

    return (
        <Modal title="Deletar Conta" close={close}>
            <h1 className="text-center">Tem certeza que deseja deletar sua conta? Essa é uma ação irreversível.</h1>

            <div className="flex justify-center items-center mt-5">
                <Button color="gray" className="mr-2" onClick={() => close()}>Cancelar</Button>
                <Button color="red" className="ml-2" onClick={() => handleUserDeletion()}>Sim</Button>
            </div>
        </Modal>
    )
}