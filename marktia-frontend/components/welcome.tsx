"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Welcome() {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-full flex flex-col justify-center">
            <div className="flex justify-center">
                <img src="/marca_aprovada.png" className="w-1/2"></img>
            </div>
            <div className="flex justify-center text-xl mt-10">
                <div>
                    <div className="flex justify-center"><span>Bem vindo(a) {user?.name}!</span></div>
                    <div><span>Explore a plataforma utilizando a barra de navegação à esquerda.</span></div>
                </div>
            </div>
        </div>
    )
}