"use client";

import { UserRole } from "@/enums/userRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FaPencilAlt } from "react-icons/fa";
import Button from "../common/button";
import TextField from "../common/forms/text_field";
import Select, { getSelectOptionsOfEnum } from "../common/forms/select";

type UserPersonalInfoProps = {
    /**
     * Por enquanto any
     */
    user: any;
}

const editUserPersonalInfoFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    cnpj: z.string(),
    telephone: z.string(),
    role: z.nativeEnum(UserRole)
});
type EditUserPersonalInfoFormData = z.infer<typeof editUserPersonalInfoFormSchema>;

export default function UserPersonalInfo({ user }: UserPersonalInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    const editUserPersonalInfoForm = useForm<EditUserPersonalInfoFormData>({
        resolver: zodResolver(editUserPersonalInfoFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            cnpj: user.cnpj,
            telephone: user.telephone,
            role: user.role
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
                            <div><span>Papel: {user.role}</span></div>
                            <div><FaPencilAlt className="cursor-pointer" onClick={() => setIsEditing(true)} /></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <FormProvider {...editUserPersonalInfoForm} >
                        <form onSubmit={handleSubmit((editUserPersonalInfoFormData: EditUserPersonalInfoFormData) => {
                            /**
                             * Por enquanto n faz nada
                             */
                        })}>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Nome"
                                        name="name"
                                    />
                                    {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="email"
                                        label="E-mail"
                                        name="email"
                                    />
                                    {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="CPF"
                                        name="cpf"
                                    />
                                    {errors.cpf && <span className="text-xs text-red-500 mt-1">{errors.cpf.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="text"
                                        label="CNPJ"
                                        name="cnpj"
                                    />
                                    {errors.cnpj && <span className="text-xs text-red-500 mt-1">{errors.cnpj.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Telefone"
                                        name="telephone"
                                    />
                                    {errors.telephone && <span className="text-xs text-red-500 mt-1">{errors.telephone.message}</span>}
                                </div>
                                <div>
                                    <Select
                                        title="Papel"
                                        name="role"
                                        options={getSelectOptionsOfEnum(UserRole)}
                                    />
                                    {errors.role && <span className="text-xs text-red-500 mt-1">{errors.role.message}</span>}
                                </div>
                            </div>
                            <div className="mt-5 pb-2">
                                <div className="flex justify-center my-5">
                                    <Button color="outlined-grey" className="mr-5" onClick={() => {
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