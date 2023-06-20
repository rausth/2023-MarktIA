import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserMainComponent from "@/components/user";
import { UsersController } from "@/controllers/users";
import { UserResponseDTO } from "@/dtos/responses/users/userResponseDTO";
import { UserRoleUtils } from "@/enums/userRole";
import { User } from "@/models/user";
import { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchUser = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        return UsersController.getById(session.user.id, session.user.token)
            .then((response: AxiosResponse<UserResponseDTO>) => {
                return {
                    ...response.data,
                    userRole: UserRoleUtils.fromNumber(response.data.userRole)
                }
            })
            .catch(() => undefined)
    } else {
        redirect("/auth/login");
    }
}

export default async function UserPage() {
    const user: User | undefined = await fetchUser();

    return <UserMainComponent user={user} />;
}