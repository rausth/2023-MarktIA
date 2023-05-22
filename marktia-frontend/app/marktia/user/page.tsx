"use client";

import { useSession } from "next-auth/react";

export default function UserPage() {
    const {data: session} = useSession();

    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                    <span className="text-2xl">Usuário - {session?.user.name}</span>
                </div>
            </div>
        </div>
    )
}