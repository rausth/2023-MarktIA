'use client';

import { AuthController } from "@/controllers/auth";
import { UserRoleUtils } from "@/enums/userRole";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuthInfo } from "@/models/user";
import { UserAuthResponseDTO } from "@/dtos/responses/users/userAuthResponseDTO";
import { deleteCookie, setCookie } from "cookies-next";

type AuthProviderProps = {
    children: ReactNode;
}

type AuthContextType = {
    token: string | null;
    user: UserAuthInfo | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserAuthInfo | null>(null);

    const fetchUserFromToken = async () => {
        const res = await fetch("/api/token", {
            method: "GET"
        });

        const json = await res.json();
        const token = json.data;

        if (token) {
            AuthController.getUserFromToken(token.value)
                .then((response: AxiosResponse<UserAuthResponseDTO>) => setUser({
                    ...response.data,
                    userRole: UserRoleUtils.fromNumber(response.data.userRole)
                }))
                .catch(() => {
                    enqueueSnackbar("Ocorreu um erro ao obter as informações de autenticação do usuário!", {
                        variant: "error"
                    });

                    setUser(null);
                });

            setToken(token.value);
        } else {
            setUser(null);
            setToken(null);
        }
    }

    useEffect(() => {
        fetchUserFromToken();
    }, []);

    const signIn = (email: string, password: string) => {
        AuthController.authenticate({
            email: email,
            password: password
        })
            .then(async (response: AxiosResponse<string>) => {
                const token: string = response.data;

                setCookie("token", token, {
                    maxAge: 60 * 60 * 1
                });

                fetchUserFromToken();

                enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
                router.push("/marktia");
            })
            .catch(() => {
                enqueueSnackbar("Ocorreu um erro ao realizar o login, tente novamente!", { variant: "error" });
            });
    }

    const signOut = () => {
        deleteCookie("token");

        router.push("/auth/login");
    }

    return (
        <AuthContext.Provider value={{ token, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}