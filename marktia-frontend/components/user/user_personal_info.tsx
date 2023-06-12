"use client";

import { UserRole, UserRoleUtils } from "@/enums/userRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FaPencilAlt } from "react-icons/fa";
import Button from "../common/button";
import TextField from "../common/forms/text_field";
import Select from "../common/forms/select";
import { User, UserPersonalData } from "@/models/user";

type UserPersonalInfoProps = {
    user: User;
    onSubmission: (userPersonalInfo: UserPersonalData) => void;
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
        .email(),
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
        })
});
type EditUserPersonalInfoFormData = z.infer<typeof editUserPersonalInfoFormSchema>;

export default function UserPersonalInfo({ user, onSubmission }: UserPersonalInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    const editUserPersonalInfoForm = useForm<EditUserPersonalInfoFormData>({
        resolver: zodResolver(editUserPersonalInfoFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            cnpj: user.cnpj,
            telephone: user.telephone,
            userRole: user.userRole
        }
    });
    const { handleSubmit, formState: { errors }, reset } = editUserPersonalInfoForm;

    return (
        <div className="p-2">
            {!isEditing ? (
                <div>
                    <div className="grid grid-cols-2 py-2">
                        <div><span>Nome: {user.name}</span></div>
                        <div><span>E-mail: {user.email}</span></div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                        <div><span>CPF: {user.cpf}</span></div>
                        <div><span>CNPJ: {user.cnpj}</span></div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                        <div><span>Telefone: {user.telephone}</span></div>
                        <div className="flex justify-between items-center">
                            <div><span>Papel: {user.userRole}</span></div>
                            <div><FaPencilAlt className="cursor-pointer" onClick={() => setIsEditing(true)} /></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <FormProvider {...editUserPersonalInfoForm} >
                        <form onSubmit={handleSubmit((editUserPersonalInfoFormData: EditUserPersonalInfoFormData) => onSubmission({
                            ...editUserPersonalInfoFormData,
                            userRole: UserRoleUtils.toNumber(editUserPersonalInfoFormData.userRole)!,
                            cnpj: editUserPersonalInfoFormData.cnpj ? editUserPersonalInfoFormData.cnpj : undefined
                        }))}>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Nome"
                                        name="name"
                                    />
                                    {errors.name && <span className="text-xs text-red mt-1">{errors.name.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="email"
                                        label="E-mail"
                                        name="email"
                                    />
                                    {errors.email && <span className="text-xs text-red mt-1">{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="CPF"
                                        name="cpf"
                                    />
                                    {errors.cpf && <span className="text-xs text-red mt-1">{errors.cpf.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="text"
                                        label="CNPJ"
                                        name="cnpj"
                                    />
                                    {errors.cnpj && <span className="text-xs text-red mt-1">{errors.cnpj.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Telefone"
                                        name="telephone"
                                    />
                                    {errors.telephone && <span className="text-xs text-red mt-1">{errors.telephone.message}</span>}
                                </div>
                                <div>
                                    <Select
                                        title="Classificação"
                                        name="userRole"
                                        options={Object.values(UserRole)}
                                    />
                                    {errors.userRole && <span className="text-xs text-red mt-1">{errors.userRole.message}</span>}
                                </div>
                            </div>

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