import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SchedulingMainComponent from "@/components/schedulings/scheduling";
import { SchedulingsController } from "@/controllers/schedulings";
import { ServicesController } from "@/controllers/services";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { SchedulingStatusUtils } from "@/enums/schedulingStatus";
import { ServiceTypeUtils } from "@/enums/serviceType";
import { UserRoleUtils } from "@/enums/userRole";
import { Scheduling } from "@/models/scheduling";
import { Service } from "@/models/service";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchScheduling = async (schedulingId: string, token: string) => {
    return SchedulingsController.getById(schedulingId, token)
        .then((response: AxiosResponse<SchedulingResponseDTO>) => {
            return {
                ...response.data,
                consumer: {
                    ...response.data.consumer,
                    userRole: UserRoleUtils.fromNumber(response.data.consumer.userRole)
                },
                status: SchedulingStatusUtils.fromNumber(response.data.status)
            }
        })
        .catch(() => undefined);
}

const fetchService = async (serviceId: string, token: string) => {
    return ServicesController.getById(serviceId, token)
        .then((response: AxiosResponse<ServiceResponseDTO>) => {
            const schedulings: Scheduling[] = [];

            response.data.schedulings.forEach((schedulingResponseDTO: SchedulingResponseDTO) => {
                schedulings.push({
                    ...schedulingResponseDTO,
                    consumer: {
                        ...schedulingResponseDTO.consumer,
                        userRole: UserRoleUtils.fromNumber(schedulingResponseDTO.consumer.userRole)
                    },
                    status: SchedulingStatusUtils.fromNumber(schedulingResponseDTO.status)
                });
            });

            const service: Service = {
                ...response.data,
                type: ServiceTypeUtils.fromNumber(response.data.type),
                provider: {
                    ...response.data.provider,
                    userRole: UserRoleUtils.fromNumber(response.data.provider.userRole)
                },
                schedulings: schedulings
            };

            return service;
        })
        .catch(() => undefined);
}

export default async function SchedulingPage({ params }: { params: { scheduling_id: string } }) {
    const session = await getServerSession(authOptions);

    if (session) {
        const scheduling: Scheduling | undefined = await fetchScheduling(params.scheduling_id, session.user.token);
        let service: Service | undefined;

        if (scheduling) {
            service = await fetchService(scheduling.serviceId, session.user.token);
        }

        return <SchedulingMainComponent scheduling={scheduling} service={service} />
    } else {
        redirect("/auth/login");
    }
}