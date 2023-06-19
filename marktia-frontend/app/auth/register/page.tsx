"use client";

import Button from "@/components/common/button";
import { AuthController } from "@/controllers/auth";
import { RegisterRequestDTO } from "@/dtos/requests/auth/registerRequestDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { enqueueSnackbar } from 'notistack';
import { useRouter } from "next/navigation";
import { UserRole, UserRoleUtils } from "@/enums/userRole";
import { useEffect, useState } from "react";
import AddressForm from "@/components/addresses/address_form";
import { BiMap, BiUser } from "react-icons/bi";
import UserPersonalInfoForm from "@/components/user/user_personal_info_form";
import { AxiosError } from "axios";
import { handleError } from "@/utils/errorHandler";

const registerFormSchema = z.object({
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
    imageURL: z.string()
        .nullable(),
    state: z.number({
        required_error: "O estado não pode ser vazio.",
        invalid_type_error: "Estado inválido"
    }),
    region: z.number({
        required_error: "A região não pode ser vazia.",
        invalid_type_error: "Região inválida"
    }),
    county: z.number({
        required_error: "O município não pode ser vazio.",
        invalid_type_error: "Município inválido"
    }),
    district: z.string()
        .nonempty({
            message: "O bairro não pode ser vazio."
        }),
    publicPlace: z.string()
        .nonempty({
            message: "A rua não pode ser vazia."
        }),
    number: z.string()
        .nonempty({
            message: "O número não pode ser vazio."
        }),
    complement: z.string()
        .nullable()
});
type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const [isAddressSectionVisible, setIsAddressSectionVisible] = useState(false);
    const [isTriggered, setTriggered] = useState(false);

    const router = useRouter();

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            userRole: UserRole.NORMAL_USER,
            name: "",
            email: "",
            password: "",
            cpf: "",
            cnpj: null,
            telephone: "",
            imageURL: null,
            state: undefined,
            region: undefined,
            county: undefined,
            district: "",
            publicPlace: "",
            number: "",
            complement: ""
        }
    });
    const { handleSubmit, trigger, setValue, formState: { errors, isValidating } } = registerForm;

    useEffect(() => {
        if (isTriggered && !isValidating && !errors.name && !errors.email && !errors.password && !errors.cpf && !errors.telephone) {
            setTriggered(false);
            setIsAddressSectionVisible(true);
        }
    }, [isValidating, errors, isTriggered]);

    const handleRegisterFormSubmission = (registerRequestDTO: RegisterRequestDTO) => {
        AuthController.register(registerRequestDTO)
            .then(() => {
                enqueueSnackbar("Registro realizado com sucesso. Faça login para continuar...", {
                    variant: "success"
                });

                router.push("/auth/login");
            })
            .catch((error: AxiosError) => handleError("Erro ao realizar o cadastro.", {
                errors: error.response?.data as any
            }));
    }

    return (
        <FormProvider {...registerForm}>
            <form onSubmit={handleSubmit((registerFormData: RegisterFormData) => handleRegisterFormSubmission({
                userRole: UserRoleUtils.toNumber(registerFormData.userRole)!,
                name: registerFormData.name,
                email: registerFormData.email,
                password: registerFormData.password,
                cpf: registerFormData.cpf,
                cnpj: registerFormData.cnpj,
                telephone: registerFormData.telephone,
                address: {
                    countyId: registerFormData.county.toString(),
                    district: registerFormData.district,
                    publicPlace: registerFormData.publicPlace,
                    number: registerFormData.number,
                    complement: registerFormData.complement
                },
                imageURL: registerFormData.imageURL
            }))}>
                {!isAddressSectionVisible ? (
                    <UserPersonalInfoForm errors={errors} />
                ) : (
                    <AddressForm setValue={setValue} errors={errors} />
                )}

                <div className="flex justify-between items-center mt-5">
                    <div><span>Já possui uma conta? <Link href="/auth/login" className="text-blue-dark font-bold">Faça login</Link></span></div>

                    {!isAddressSectionVisible ? (
                        <div>
                            <Button color="blue" onClick={() => {
                                setTriggered(true);
                                trigger(["name", "email", "password", "cpf", "telephone"]);
                            }}>
                                <div className="flex items-center">
                                    <div className="mr-2"><span>Avançar (Informações Geográficas)</span></div>
                                    <div><BiMap /></div>
                                </div>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className="flex">
                                <Button color="blue" onClick={() => setIsAddressSectionVisible(false)} className="mr-2">
                                    <div className="flex items-center">
                                        <div className="mr-2"><span>Voltar (Informações Pessoais)</span></div>
                                        <div><BiUser /></div>
                                    </div>
                                </Button>
                                <Button type="submit" color="blue">Registrar</Button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </FormProvider>
    )
}