"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/forms/input";

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
        <FormProvider {...loginForm}>
            <form onSubmit={handleSubmit((loginFormData: LoginFormData) => {
                /**
                 * Por enquanto n faz nada
                 */
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
                        label="Password"
                        name="password"
                    />
                    {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
                </div>
            </form>
        </FormProvider>
    )
}