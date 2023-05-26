"use client";

import Button from "@/components/common/button";
import TextField from "@/components/common/forms/text_field";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});
type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset } = registerForm;

    return (
        <FormProvider {...registerForm}>
            <form onSubmit={handleSubmit((registerFormData: RegisterFormData) => {
                /**
                 * Por enquanto n faz nada
                 */
                console.log("[registerForm]")
            })}>
                <div className="p-1">
                    <TextField
                        type="text"
                        label="Nome"
                        name="name"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                </div>

                <div className="p-1">
                    <TextField
                        type="email"
                        label="Email"
                        name="email"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                </div>

                <div className="p-1">
                    <TextField
                        type="password"
                        label="Senha"
                        name="password"
                    />
                    {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
                </div>

                <div className="flex justify-between items-center mt-5">
                    <div><span>Já possui uma conta? <Link href="/auth/login">Faça login</Link></span></div>
                    <Button type="submit" color="green">Registrar</Button>
                </div>
            </form>
        </FormProvider>
    )
}