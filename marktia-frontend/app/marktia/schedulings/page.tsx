import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SchedulingsMainComponent from "@/components/schedulings";
import { SchedulingsController } from "@/controllers/schedulings";
import { SchedulingBasicInfo } from "@/models/scheduling";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchSchedulings = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        return SchedulingsController.getAll(session.user.id, true, 0, session.user.token)
            .then((response: AxiosResponse<SchedulingBasicInfo[]>) => response.data)
            .catch(() => []);
    } else {
        redirect("/auth/login");
    }
}

export default async function AgendamentosPage() {
    const schedulings: SchedulingBasicInfo[] = await fetchSchedulings();

    return <SchedulingsMainComponent schedulings={schedulings} />
}