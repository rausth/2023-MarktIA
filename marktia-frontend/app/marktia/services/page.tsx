import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ServicesMainComponent from "@/components/services";
import { ServicesController } from "@/controllers/services";
import { ServiceBasicInfoResponseDTO } from "@/dtos/responses/services/serviceBasicInfoResponseDTO";
import { ServiceBasicInfo } from "@/models/service";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchServices = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        return ServicesController.getAll({ myServices: false }, session.user.token)
            .then((response: AxiosResponse<ServiceBasicInfoResponseDTO[]>) => response.data)
            .catch(() => [])
    } else {
        redirect("/auth/login");
    }
}

export default async function ServicesPage() {
    const services: ServiceBasicInfo[] = await fetchServices();

    return <ServicesMainComponent services={services} />;
}