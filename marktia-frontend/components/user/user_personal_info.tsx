"use client";

import { UserRole, UserRoleUtils } from "@/enums/userRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FaPencilAlt } from "react-icons/fa";
import Button from "../common/button";
import { User, UserPersonalData } from "@/models/user";
import UserPersonalInfoForm from "./user_personal_info_form";

type UserPersonalInfoProps = {
    user: User;
    onSubmission: (userPersonalInfo: UserPersonalData, onSuccess: () => void) => void;
}

const editUserPersonalInfoFormSchema = z.object({
    userRole: z.string(),
    name: z.string()
        .nonempty({
            message: "O nome não pode ser vazio."
        }),
    email: z.string()
        .nonempty({
            message: "O email não pode ser vazio."
        })
        .email({
            message: "Endereço de email inválido."
        }),
    telephone: z.string()
        .nonempty({
            message: "O número de telefone não pode ser vazio."
        })
        .min(10, {
            message: "O número de telefone deve possuir no mínimo 10 caracteres."
        })
        .max(11, {
            message: "O número de telefone deve possuir no máximo 11 caracteres."
        })
        .regex(new RegExp("^\\d+$"), {
            message: "O telefone deve ter um formato válido. " +
                "Exemplo: 27998516543."
        }),
    cpf: z.string()
        .nonempty({
            message: "O CPF não pode ser vazio."
        })
        .max(15, {
            message: "O CPF deve possuir no máximo 15 caracteres."
        })
        .regex(new RegExp("^\\d{11}$"), {
            message: "O CPF deve ter um formato válido. " +
                "Exemplo: 21262772087."
        }),
    cnpj: z.string()
        .nullable(),
});
type EditUserPersonalInfoFormData = z.infer<typeof editUserPersonalInfoFormSchema>;

export default function UserPersonalInfo(userPersonalInfoProps: UserPersonalInfoProps) {
    const [user, setUser] = useState(userPersonalInfoProps.user);
    const [isEditing, setIsEditing] = useState(false);

    const editUserPersonalInfoForm = useForm<EditUserPersonalInfoFormData>({
        resolver: zodResolver(editUserPersonalInfoFormSchema),
        defaultValues: {
            userRole: user.userRole,
            name: user.name,
            email: user.email,
            telephone: user.telephone,
            cpf: user.cpf,
            cnpj: user.cnpj,
        }
    });
    const { handleSubmit, formState: { errors }, reset } = editUserPersonalInfoForm;

    return (
        <div className="p-2">
            {!isEditing ? (
                <div>
                    <div className="grid grid-cols-2 py-2">
                        <div><span>Classificação: {user.userRole}</span></div>
                        <div><span>Nome: {user.name}</span></div>

                    </div>
                    <div className="grid grid-cols-2 py-2">
                        <div><span>E-mail: {user.email}</span></div>
                        <div><span>Telefone: {user.telephone}</span></div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                        <div><span>CPF: {user.cpf}</span></div>
                        <div className="flex justify-between items-center">
                            <div><span>CNPJ: {user.cnpj}</span></div>
                            <div><FaPencilAlt className="cursor-pointer" onClick={() => setIsEditing(true)} /></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <FormProvider {...editUserPersonalInfoForm} >
                        <form onSubmit={handleSubmit((editUserPersonalInfoFormData: EditUserPersonalInfoFormData) => userPersonalInfoProps.onSubmission({
                            ...editUserPersonalInfoFormData,
                            userRole: UserRoleUtils.toNumber(editUserPersonalInfoFormData.userRole)!,
                            cnpj: editUserPersonalInfoFormData.cnpj ? editUserPersonalInfoFormData.cnpj : undefined
                        }, () => {
                            reset();
                            setIsEditing(false);
                        }))}>
                            <UserPersonalInfoForm errors={errors} editVersion={true} />

                            <div className="mt-5 pb-2">
                                <div className="flex justify-center my-5">
                                    <Button color="gray" className="mr-5" onClick={() => {
                                        reset();
                                        setIsEditing(false);
                                    }}>Cancelar</Button>
                                    <Button type="submit" color="green">Atualizar</Button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            )}
        </div>
    )
}