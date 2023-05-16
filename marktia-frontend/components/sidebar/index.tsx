"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaBusinessTime, FaUserAlt, FaHome } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

export default function Sidebar() {
    const [isSidebarOpened, toggleIsSidebarOpened] = useState(false);
    const router = useRouter();

    return (
        <div className={`${isSidebarOpened ? "w-72" : "w-20"} h-screen bg-red-200 duration-300`}>
            <div className="h-full flex flex-col justify-between">
                <div>
                    <FaBars className="text-2xl cursor-pointer ml-7 mt-10" onClick={() => toggleIsSidebarOpened(!isSidebarOpened)} />
                </div>
                <div>
                    <div className="flex items-center mb-10">
                        <FaHome className="text-2xl cursor-pointer ml-7" onClick={() => router.push("/")} />
                        {isSidebarOpened && <span className="text-xl ml-5">Página Principal</span>}
                    </div>
                    <div className="flex items-center mt-10 mb-10">
                        <FaBusinessTime className="text-2xl cursor-pointer ml-7" onClick={() => router.push("/service")} />
                        {isSidebarOpened && <span className="text-xl ml-5">Serviços</span>}
                    </div>
                    <div className="flex items-center mt-10">
                        <FaUserAlt className="text-2xl cursor-pointer ml-7" onClick={() => router.push("/user")} />
                        {isSidebarOpened && <span className="text-xl ml-5">Informações Pessoais</span>}
                    </div>
                </div>
                <div>
                    <MdOutlineLogout className="text-2xl cursor-pointer ml-7 mb-10" onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}