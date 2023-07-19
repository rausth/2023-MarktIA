import Welcome from "@/components/welcome";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function MarktiaPage() {
    const token = cookies().get("token");

    if (token) {
        return <Welcome />;
    } else {
        redirect("/auth/login");
    }
}