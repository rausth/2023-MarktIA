"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/forms/input";
import Button from "@/components/common/button";
import Link from "next/link";

const loginFormSchema = z.object({
    email: z.string(),
    password: z.string()
});
type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset } = loginForm;

    return (
        <div>
            <FormProvider {...loginForm}>
                <form onSubmit={handleSubmit((loginFormData: LoginFormData) => {
                    /**
                     * Por enquanto n faz nada
                     */
                    console.log("[loginForm]")
                })}>
                    <div className="p-1">
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                        />
                        {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="p-1">
                        <Input
                            type="password"
                            label="Senha"
                            name="password"
                        />
                        {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <div><span>Não possui uma conta? <Link href="/register">Registre-se</Link></span></div>
                        <Button type="submit" color="green">Login</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}