import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SchedulingMainComponent from "@/components/schedulings/scheduling";
import { SchedulingsController } from "@/controllers/schedulings";
import { ServicesController } from "@/controllers/services";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { MOCKED_SCHEDULINGS } from "@/mocks/scheduling";
import { MOCKED_SERVICES } from "@/mocks/service";
import { Scheduling } from "@/models/scheduling";
import { Service } from "@/models/service";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchScheduling = async (schedulingId: string, token: string) => {
    return SchedulingsController.getById(schedulingId, token)
        .then((response: AxiosResponse<SchedulingResponseDTO>) => response.data)
        .catch(() => MOCKED_SCHEDULINGS[0]);
}

const fetchService = async (serviceId: string, token: string) => {
    return ServicesController.getById(serviceId, token)
        .then((response: AxiosResponse<ServiceResponseDTO>) => response.data)
        .catch(() => MOCKED_SERVICES[0]);
}

export default async function SchedulingPage({ params }: { params: { scheduling_id: string } }) {
    const session = await getServerSession(authOptions);

    if (session) {
        const scheduling: Scheduling = await fetchScheduling(params.scheduling_id, session.user.token);
        const service: Service = await fetchService(scheduling.serviceId, session.user.token);

        return <SchedulingMainComponent scheduling={scheduling} service={service} />
    } else {
        redirect("/auth/login");
    }
}