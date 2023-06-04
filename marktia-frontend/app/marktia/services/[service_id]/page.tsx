import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ServiceMainComponent from "@/components/services/service";
import { EvaluationsController } from "@/controllers/evaluations";
import { ServicesController } from "@/controllers/services";
import { EvaluationResponseDTO } from "@/dtos/responses/evaluations/evaluationResponseDTO";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { SchedulingStatusUtils } from "@/enums/schedulingStatus";
import { ServiceTypeUtils } from "@/enums/serviceType";
import { UserRoleUtils } from "@/enums/userRole";
import { MOCKED_EVALUATIONS } from "@/mocks/evaluation";
import { MOCKED_SERVICES } from "@/mocks/service";
import { Evaluation } from "@/models/evaluation";
import { Scheduling } from "@/models/scheduling";
import { Service } from "@/models/service";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchService = async (serviceId: string, token: string) => {
    return ServicesController.getById(serviceId, token)
        .then((response: AxiosResponse<ServiceResponseDTO>) => {
            const schedulings: Scheduling[] = [];

            response.data.schedulings.forEach((schedulingResponseDTO: SchedulingResponseDTO) => {
                schedulings.push({
                    ...schedulingResponseDTO,
                    consumer: {
                        ...schedulingResponseDTO.consumer,
                        role: UserRoleUtils.fromNumber(schedulingResponseDTO.consumer.role)
                    },
                    status: SchedulingStatusUtils.fromNumber(schedulingResponseDTO.status)
                });
            });

            const service: Service = {
                ...response.data,
                type: ServiceTypeUtils.fromNumber(response.data.type),
                provider: {
                    ...response.data.provider,
                    role: UserRoleUtils.fromNumber(response.data.provider.role)
                },
                schedulings: schedulings
            };

            return service;
        })
        .catch(() => MOCKED_SERVICES[0]);
}

const fetchEvaluations = async (serviceId: string, token: string) => {
    return EvaluationsController.getByService(serviceId, token)
        .then((response: AxiosResponse<EvaluationResponseDTO[]>) => response.data)
        .catch(() => MOCKED_EVALUATIONS);
}

export default async function ServicePage({ params }: { params: { service_id: string } }) {
    const session = await getServerSession(authOptions);

    if (session) {
        const service: Service = await fetchService(params.service_id, session.user.token);
        const evaluations: Evaluation[] = await fetchEvaluations(params.service_id, session.user.token);

        return <ServiceMainComponent service={service} evaluations={evaluations} />;
    } else {
        redirect("/auth/login");
    }
}