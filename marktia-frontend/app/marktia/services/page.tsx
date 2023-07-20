import ServicesMainComponent from "@/components/services";
import { ServicesController } from "@/controllers/services";
import { ServiceBasicInfoResponseDTO } from "@/dtos/responses/services/serviceBasicInfoResponseDTO";
import { ServiceBasicInfo } from "@/models/service";
import { AxiosResponse } from "axios";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

const fetchServices = async () => {
    const token = cookies().get("token");

    if (token) {
        return ServicesController.getAll({}, token.value)
            .then((response: AxiosResponse<ServiceBasicInfoResponseDTO[]>) => response.data)
            .catch(() => [])
    } else {
        redirect("/auth/login");
    }
}

export default async function ServicesPage() {
    const services: ServiceBasicInfo[] = await fetchServices();

    console.log(services);

    return <ServicesMainComponent services={services} />;
}