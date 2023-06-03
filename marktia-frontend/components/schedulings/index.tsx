"use client";

import { SchedulingsController } from "@/controllers/schedulings";
import { MOCKED_SCHEDULINGS } from "@/mocks/scheduling";
import { MOCKED_SERVICES } from "@/mocks/service";
import { SchedulingBasicInfo } from "@/models/scheduling";
import { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { createRef, useEffect, useRef, useState } from "react";
import SchedulingsList from "./schedulings_list";

type SchedulingsProps = {
    schedulings: SchedulingBasicInfo[];
}

export default function SchedulingsMainComponent(schedulingsProps: SchedulingsProps) {
    const [schedulings, setSchedulings] = useState<SchedulingBasicInfo[]>(schedulingsProps.schedulings);

    const [isClientSelected, setIsClientSelected] = useState(true);
    const [currentExhibitedSchedulings, setCurrentExhibitedSchedulings] = useState(0);
    const client = createRef<HTMLSpanElement>();
    const provider = createRef<HTMLSpanElement>();
    const openSchedulings = createRef<HTMLSpanElement>();
    const deliveredSchedulings = createRef<HTMLSpanElement>();
    const finishedSchedulings = createRef<HTMLSpanElement>();

    const { data: session } = useSession();

    const isFirstRender = useRef(true);

    useEffect(() => {
        const fetchSchedulings = () => {
            /**
             * [TODO]
             * Descomentar quando backend estiver pronto
             */
            // if (session) {
            //     SchedulingsController.getAll(session.user.id, isClientSelected, currentExhibitedSchedulings, session.user.token)
            //         .then((response: AxiosResponse<SchedulingBasicInfo[]>) => setSchedulings(response.data))
            //         .catch((error: AxiosError) => enqueueSnackbar("Houve um erro ao atualizar os agendamentos.", { variant: "error" }));
            // }

            setSchedulings([
                {
                    id: MOCKED_SCHEDULINGS[0].id,
                    provider: MOCKED_SERVICES[0].provider,
                    consumer: MOCKED_SCHEDULINGS[0].consumer
                },
                {
                    id: MOCKED_SCHEDULINGS[0].id,
                    provider: MOCKED_SERVICES[0].provider,
                    consumer: MOCKED_SCHEDULINGS[0].consumer
                },
            ]);
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            fetchSchedulings();
        }
    }, [isClientSelected, currentExhibitedSchedulings])

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
                    <span ref={client} className="cursor-pointer text-orange-500" onClick={() => { changeIsClientSelected(true) }}>Cliente</span>
                    <span ref={provider} className="cursor-pointer" onClick={() => { changeIsClientSelected(false) }}>Provedor</span>
                </div>
                <div className="text-lg flex justify-around border-b-2 border-black p-2 mt-5">
                    <span ref={openSchedulings} className="cursor-pointer text-orange-500" onClick={() => { changeCurrentExhibitedSchedulings(0) }}>Agendamentos Abertos</span>
                    <span ref={deliveredSchedulings} className="cursor-pointer" onClick={() => { changeCurrentExhibitedSchedulings(1) }}>Agendamentos Entregues</span>
                    <span ref={finishedSchedulings} className="cursor-pointer" onClick={() => { changeCurrentExhibitedSchedulings(2) }}>Agendamentos Finalizados</span>
                </div>
                <SchedulingsList schedulings={schedulings} />
            </div>
        </div>
    )
}