"use client";

import { useRouter } from "next/navigation";
import Avatar from "../common/avatar";
import Button from "../common/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SchedulingBasicInfo } from "@/models/scheduling";

type SchedulingCardProps = {
    scheduling: SchedulingBasicInfo;
}

export default function SchedulingCard({ scheduling }: SchedulingCardProps) {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center m-5 p-5 bg-red-200">
            <div className="flex items-center">
                <div className="w-[96px] h-[96px] rounded-full mr-2 bg-gray-400">
                    <Avatar url={scheduling.provider.imageURL} />
                </div>
                <div><span>Provedor: {scheduling.provider.name}</span></div>
            </div>
            <div className="flex items-center">
                <div className="w-[96px] h-[96px] rounded-full mr-2 bg-gray-400">
                    <Avatar url={scheduling.consumer.imageURL} />
                </div>
                <div><span>Cliente: {scheduling.consumer.name}</span></div>
            </div>
            <div>
                <Button onClick={() => router.push("/marktia/schedulings/" + scheduling.id)}>
                    <div className="flex items-center">
                        <span className="mr-5">Detalhes </span>
                        <span><FaExternalLinkAlt /></span>
                    </div>
                </Button>
            </div>
        </div>
    )
}