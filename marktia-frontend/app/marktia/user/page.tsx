"use client";

import { useSession } from "next-auth/react";

export default function UserPage() {
    const {data: session} = useSession();

    return (
        <div>
            <p>Nome do Usuário: {session?.user.name}</p>
        </div>
    )
}