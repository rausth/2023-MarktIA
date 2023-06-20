export enum SchedulingStatus {
    OPENED = "Aberto",
    DELIVERED = "Entregue",
    FINISHED = "Finalizado"
}

export const SchedulingStatusUtils = {
    fromNumber: (number: number): SchedulingStatus => {
        if (number === 0)
            return SchedulingStatus.OPENED;
        else if (number === 1)
            return SchedulingStatus.DELIVERED;
        else
            return SchedulingStatus.FINISHED;
    },

    toNumber: (status: string): number | undefined => {
        if (status === SchedulingStatus.OPENED)
            return 0;
        else if (status === SchedulingStatus.DELIVERED)
            return 1;
        else if (status === SchedulingStatus.FINISHED)
            return 2;
        else
            return undefined;
    }
}