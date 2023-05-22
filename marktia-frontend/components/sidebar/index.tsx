"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaBusinessTime, FaUserAlt, FaHome } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { AiFillSchedule } from 'react-icons/ai';
import { signOut } from "next-auth/react";

export default function Sidebar() {
    const [isSidebarOpened, toggleIsSidebarOpened] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    const changePage = (pageURL: string, pageNumber: number) => {
        router.push(pageURL);
        setCurrentPage(pageNumber);
    }

    return (
        <div className={`${isSidebarOpened ? "w-72" : "w-20"} h-screen bg-red-200 duration-300`}>
            <div className="h-full flex flex-col justify-between">
                <div>
                    <FaBars className="text-2xl cursor-pointer ml-7 mt-10" onClick={() => toggleIsSidebarOpened(!isSidebarOpened)} />
                </div>
                <div>
                    <div className={"flex items-center py-2 mb-10" + (currentPage === 0 ? " bg-red-400" : "")}>
                        <FaHome className="text-2xl cursor-pointer ml-7" onClick={() => changePage("/marktia", 0)} />
                        {isSidebarOpened && <span className="text-xl ml-5">Página Principal</span>}
                    </div>
                    <div className={"flex items-center py-2 mt-10 mb-10" + (currentPage === 1 ? " bg-red-400" : "")}>
                        <FaBusinessTime className="text-2xl cursor-pointer ml-7" onClick={() => changePage("/marktia/services", 1)} />
                        {isSidebarOpened && <span className="text-xl ml-5">Serviços</span>}
                    </div>
                    <div className={"flex items-center py-2 mt-10 mb-10" + (currentPage === 2 ? " bg-red-400" : "")}>
                        <AiFillSchedule className="text-2xl cursor-pointer ml-7" onClick={() => changePage("/marktia/agendamentos", 2)} />
                        {isSidebarOpened && <span className="text-xl ml-5">Agendamentos</span>}
                    </div>
                    <div className={"flex items-center py-2 mt-10" + (currentPage === 3 ? " bg-red-400" : "")}>
                        <FaUserAlt className="text-2xl cursor-pointer ml-7" onClick={() => changePage("/marktia/user", 3)} />
                        {isSidebarOpened && <span className="text-xl ml-5">Informações Pessoais</span>}
                    </div>
                </div>
                <div>
                    <MdOutlineLogout className="text-2xl cursor-pointer ml-7 mb-10" onClick={() => { signOut() }} />
                </div>
            </div>
        </div>
    )
}