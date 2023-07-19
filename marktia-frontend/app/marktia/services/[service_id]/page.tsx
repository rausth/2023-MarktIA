import ServiceMainComponent from "@/components/services/service";
import { EvaluationsController } from "@/controllers/evaluations";
import { ServicesController } from "@/controllers/services";
import { EvaluationResponseDTO } from "@/dtos/responses/evaluations/evaluationResponseDTO";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { SchedulingStatusUtils } from "@/enums/schedulingStatus";
import { ServiceTypeUtils } from "@/enums/serviceType";
import { UserRoleUtils } from "@/enums/userRole";
import { Evaluation } from "@/models/evaluation";
import { Scheduling } from "@/models/scheduling";
import { Service } from "@/models/service";
import { AxiosResponse } from "axios";
import { cookies } from "next/dist/client/components/headers";
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

const fetchEvaluations = async (serviceId: string, token: string) => {
    return EvaluationsController.getByService(serviceId, token)
        .then((response: AxiosResponse<EvaluationResponseDTO[]>) => response.data)
        .catch(() => []);
}

export default async function ServicePage({ params }: { params: { service_id: string } }) {
    const token = cookies().get("token");

    if (token) {
        const service: Service | undefined = await fetchService(params.service_id, token.value);
        let evaluations: Evaluation[] = [];

        if (service) {
            evaluations = await fetchEvaluations(service.id, token.value);
        }

        return <ServiceMainComponent service={service} evaluations={evaluations} />;
    } else {
        redirect("/auth/login");
    }
}