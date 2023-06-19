"use client";

import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { UsersController } from "@/controllers/users";
import { handleError } from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from "notistack";

type UserDeletionModalProps = {
    close: () => void;
}

export default function UserDeletionModal({ close }: UserDeletionModalProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleUserDeletion = () => {
        if (session) {
            UsersController.delete(session.user.id, session.user.token)
                .then(() => signOut())
                .catch((error: AxiosError) => handleError("Ocorreu um erro ao deletar o usuário.", {
                    errors: error.response?.data as any
                }));
        } else {
            router.push("/auth/login");
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