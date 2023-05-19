import Button from "@/components/common/button";
import { MOCKED_USERS } from "@/mocks/user";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default async function UserPage() {
    /**
     * Por enquanto, mockando dados
     */
    const user = MOCKED_USERS[0];

    return (
        <div>
            {user ? (
                <div className="text-2xl border-b-2 border-black pb-2">
                    <div><span>Informações Pessoais - {user.name}</span></div>
                </div>
            ) : (
                <div>
                    {
                        /**
                         * Tratamento de erro posteriormente
                         */
                    }
                    <p>Usuário não encontrado</p>
                </div>
            )}
        </div>
    )
}