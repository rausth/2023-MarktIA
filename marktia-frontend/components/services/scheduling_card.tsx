type SchedulingCardProps = {
    /**
     * Any por enquanto
     */
    scheduling: any;
}

export default function SchedulingCard({ scheduling }: SchedulingCardProps) {
    return (
        <div className="m-5 bg-red-200">
            <div className="grid grid-cols-2 py-2">
                <div><span>Cliente: {scheduling.consumer.name}</span></div>
                <div><span>Status: {scheduling.status}</span></div>
            </div>
            <div className="py-2"><span>Data de Criação: {scheduling.creationDate.toDateString()}</span></div>
        </div>
    )
}