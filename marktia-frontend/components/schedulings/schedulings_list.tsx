import SchedulingCard from "./scheduling_card";

type SchedulingsListProps = {
    /**
     * Usando any por enquanto
     */
    schedulings: Array<any>;
}

export default function SchedulingsList({ schedulings }: SchedulingsListProps) {
    return (
        <div>
            <div className="h-[40rem] p-5 mt-5 overflow-y-auto">
                {schedulings.map((scheduling: any, idx: number) => (
                    <SchedulingCard scheduling={scheduling} />
                ))}
            </div>
        </div>
    )
}