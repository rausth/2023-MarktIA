"use client";

import Button from "@/components/common/button";
import TextField from "@/components/common/forms/text_field";
import { AuthController } from "@/controllers/auth";
import { RegisterRequestDTO } from "@/dtos/requests/auth/registerRequestDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { enqueueSnackbar } from 'notistack';
import { useRouter } from "next/navigation";
import Select from "@/components/common/forms/select";
import { UserRole, UserRoleUtils } from "@/enums/userRole";

const registerFormSchema = z.object({
    role: z.string(),
    name: z.string()
        .nonempty({
            message: "O nome não pode ser vazio."
        }),
    email: z.string()
        .nonempty({
            message: "O email não pode ser vazio."
        })
        .email(),
    password: z.string()
        .nonempty({
            message: "A senha não pode ser vazia."
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
    addressId: z.number(),
    imageURL: z.string()
        .nullable()
});
type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const router = useRouter();

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            role: UserRole.NORMAL_USER,
            name: "",
            email: "",
            password: "",
            cpf: "",
            cnpj: undefined,
            telephone: "",
            addressId: undefined,
            imageURL: undefined
        }
    });
    const { handleSubmit, formState: { errors }, reset } = registerForm;

    const handleRegisterFormSubmission = (registerRequestDTO: RegisterRequestDTO) => {
        AuthController.register(registerRequestDTO)
            .then(() => {
                enqueueSnackbar("Registro realizado com sucesso. Faça login para continuar...", {
                    variant: "success"
                });

                router.push("/auth/login");
            })
            .catch(() => enqueueSnackbar("Erro ao realizar o cadastro.", {
                variant: "error"
            }));
    }

    return (
        <FormProvider {...registerForm}>
            <form onSubmit={handleSubmit((registerFormData: RegisterFormData) => handleRegisterFormSubmission({
                ...registerFormData,
                role: UserRoleUtils.toNumber(registerFormData.role)!,
                addressId: registerFormData.addressId.toString()
            }))}>
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-1">
                        <Select
                            title="Classificação"
                            name="role"
                            options={Object.values(UserRole)}
                        />
                        {errors.role && <span className="text-xs text-red mt-1">{errors.role.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="Nome"
                            name="name"
                        />
                        {errors.name && <span className="text-xs text-red mt-1">{errors.name.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-1">
                        <TextField
                            type="email"
                            label="Email"
                            name="email"
                        />
                        {errors.email && <span className="text-xs text-red mt-1">{errors.email.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextField
                            type="password"
                            label="Senha"
                            name="password"
                        />
                        {errors.password && <span className="text-xs text-red mt-1">{errors.password.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="CPF"
                            name="cpf"
                        />
                        {errors.cpf && <span className="text-xs text-red mt-1">{errors.cpf.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="CNPJ"
                            name="cnpj"
                            placeholder="Deixe em branco caso não se aplique"
                        />
                        {errors.cnpj && <span className="text-xs text-red mt-1">{errors.cnpj.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="Número de Telefone"
                            name="telephone"
                        />
                        {errors.telephone && <span className="text-xs text-red mt-1">{errors.telephone.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextField
                            type="number"
                            label="ID do Endereço"
                            name="addressId"
                        />
                        {errors.addressId && <span className="text-xs text-red mt-1">{errors.addressId.message}</span>}
                    </div>
                </div>

                <div className="p-1">
                    <TextField
                        type="text"
                        label="URL da Imagem de Perfil"
                        name="imageURL"
                    />
                    {errors.imageURL && <span className="text-xs text-red mt-1">{errors.imageURL.message}</span>}
                </div>

                <div className="flex justify-between items-center mt-5">
                    <div><span>Já possui uma conta? <Link href="/auth/login" className="text-blue-dark font-bold">Faça login</Link></span></div>
                    <Button type="submit" color="blue">Registrar</Button>
                </div>
            </form>
        </FormProvider>
    )
}