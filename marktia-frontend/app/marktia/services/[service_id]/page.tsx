import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ServiceMainComponent from "@/components/services/service";
import { ServicesController } from "@/controllers/services";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { MOCKED_SERVICES } from "@/mocks/service";
import { Service } from "@/models/service";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchService = async (serviceId: string) => {
    const session = await getServerSession(authOptions);

    if (session) {
        return ServicesController.getById(serviceId, session.user.token)
            .then((response: AxiosResponse<ServiceResponseDTO>) => response.data)
            .catch(() => MOCKED_SERVICES[0]);
    } else {
        redirect("/auth/login");
    }
}

export default async function ServicePage({ params }: { params: { service_id: string } }) {
    const service: Service = await fetchService(params.service_id);

    return <ServiceMainComponent service={service} />;
}