"use client";

import Button from "../common/button";

export default function ScheduleService() {
    return (
        <div className="flex justify-center items-center my-5">
            <div className="text-xl"><span>Se interessou por esse serviço?</span></div>
            <div><Button onClick={() => { }}>Agendar Serviço</Button></div>
        </div>
    )
}