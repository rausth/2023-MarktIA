"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import TextField from "@/components/common/forms/text_field";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
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
        })
});
type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const router = useRouter();

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset } = loginForm;

    const handleLoginFormSubmission = async (email: string, password: string) => {
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        });

        if (!result?.error) {
            enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
            router.push("/marktia");
        } else {
            enqueueSnackbar("Ocorreu um erro ao realizar o login, tente novamente!", { variant: "error" });
        }
    }

    return (
        <div>
            <h1 className="text-center text-2xl my-2">Login</h1>
            <FormProvider {...loginForm}>
                <form onSubmit={handleSubmit((loginFormData: LoginFormData) => handleLoginFormSubmission(loginFormData.email, loginFormData.password))}>
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

                    <div className="flex justify-between items-center mt-5">
                        <div><span>Não possui uma conta? <Link href="/auth/register" className="text-blue-dark font-bold">Registre-se</Link></span></div>
                        <Button type="submit" color="blue">Login</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}