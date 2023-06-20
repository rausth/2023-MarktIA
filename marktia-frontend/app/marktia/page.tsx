import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function MarktiaPage() {
    const session = await getServerSession();

    if (session) {
        return (
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <img src="/marca_aprovada.png" className="w-1/2"></img>
                </div>
                <div className="flex justify-center text-xl mt-10">
                    <div>
                        <div className="flex justify-center"><span>Bem vindo(a) {session.user.name}!</span></div>
                        <div><span>Explore a plataforma utilizando a barra de navegação à esquerda.</span></div>
                    </div>
                </div>
            </div>
        )
    } else {
        redirect("/auth/login");
    }
}