import { SchedulingBasicInfo } from "@/models/scheduling";
import SchedulingCard from "./scheduling_card";

type SchedulingsListProps = {
    schedulings: Array<SchedulingBasicInfo>;
}

export default function SchedulingsList({ schedulings }: SchedulingsListProps) {
    return (
        <div>
            <div className="h-[40rem] p-5 mt-5 overflow-y-auto">
                {schedulings.map((scheduling: SchedulingBasicInfo, idx: number) => (
                    <SchedulingCard key={idx} scheduling={scheduling} />
                ))}
            </div>
        </div>
    )
}