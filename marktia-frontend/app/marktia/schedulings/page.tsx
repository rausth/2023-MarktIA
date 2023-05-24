"use client";

import SchedulingsList from "@/components/schedulings/schedulings_list";
import { MOCKED_SCHEDULINGS } from "@/mocks/scheduling";
import { createRef, useEffect, useState } from "react";

export default function AgendamentosPage() {
    const [schedulings, setSchedulings] = useState<any[]>([]);
    const [isClientSelected, setIsClientSelected] = useState(true);
    const [currentExhibitedSchedulings, setCurrentExhibitedSchedulings] = useState(0);

    const client = createRef<HTMLSpanElement>();
    const provider = createRef<HTMLSpanElement>();
    const openSchedulings = createRef<HTMLSpanElement>();
    const deliveredSchedulings = createRef<HTMLSpanElement>();
    const finishedSchedulings = createRef<HTMLSpanElement>();

    useEffect(() => {
        const fetchSchedulings = async () => {
            /**
             * Por enquanto, mockando dados e usando any
             * Alem disso, buscando sempre os mesmos agendamentos
             */

            if (isClientSelected) {
                /**
                 * Busca agendamentos que sou cliente
                 */
            } else {
                /**
                 * Busca agendamentos que sou provedor
                 */
            }

            if (currentExhibitedSchedulings === 0) {
                /**
                 * Busca agendamentos abertos
                 */
            } else if (currentExhibitedSchedulings === 1) {
                /**
                 * Busca agendamentos entregues
                 */
            } else if (currentExhibitedSchedulings === 2) {
                /**
                 * Busca agendamentos finalizados
                 */
            }

            setSchedulings(MOCKED_SCHEDULINGS);
        }

        fetchSchedulings();
    }, [isClientSelected, currentExhibitedSchedulings]);

    const changeIsClientSelected = (newIsClientSelectedValue: boolean) => {
        if (client.current && provider.current) {
            client.current.className = "cursor-pointer";
            provider.current.className = "cursor-pointer";

            if (newIsClientSelectedValue) {
                client.current.className += " text-orange-500";
            } else {
                provider.current.className += " text-orange-500";
            }

            setIsClientSelected(newIsClientSelectedValue);
        }
    }

    const changeCurrentExhibitedSchedulings = (schedulingsToShow: number) => {
        if (openSchedulings.current && deliveredSchedulings.current && finishedSchedulings.current) {
            openSchedulings.current.className = "cursor-pointer";
            deliveredSchedulings.current.className = "cursor-pointer";
            finishedSchedulings.current.className = "cursor-pointer";

            if (schedulingsToShow === 0) {
                openSchedulings.current.className += " text-orange-500";
            } else if (schedulingsToShow === 1) {
                deliveredSchedulings.current.className += " text-orange-500";
            } else if (schedulingsToShow === 2) {
                finishedSchedulings.current.className += " text-orange-500";
            }

            setCurrentExhibitedSchedulings(schedulingsToShow);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                    <span className="text-2xl">Agendamentos</span>
                </div>
            </div>

            <div className="mx-10">
                <div className="text-lg flex justify-around border-b-2 border-black p-2 mt-5">
                    <span ref={client} className="cursor-pointer text-orange-500" onClick={() => {changeIsClientSelected(true)}}>Cliente</span>
                    <span ref={provider} className="cursor-pointer" onClick={() => {changeIsClientSelected(false)}}>Provedor</span>
                </div>
                <div className="text-lg flex justify-around border-b-2 border-black p-2 mt-5">
                    <span ref={openSchedulings} className="cursor-pointer text-orange-500" onClick={() => {changeCurrentExhibitedSchedulings(0)}}>Agendamentos Abertos</span>
                    <span ref={deliveredSchedulings} className="cursor-pointer" onClick={() => {changeCurrentExhibitedSchedulings(1)}}>Agendamentos Entregues</span>
                    <span ref={finishedSchedulings} className="cursor-pointer" onClick={() => {changeCurrentExhibitedSchedulings(2)}}>Agendamentos Finalizados</span>
                </div>
                <SchedulingsList schedulings={schedulings} />
            </div>
        </div>
    )
}