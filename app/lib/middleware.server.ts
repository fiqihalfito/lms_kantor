import { redirect } from "react-router";
import { getIdUserFromSession, getUserFromSession } from "./session.server";
import { userContext, type UserContextType } from "./context";
import { FIRST_SEGMENT } from "./route-config";
import { getNamaSubbidang, getUserByIdUser } from "~/routes/app/_service";

export async function authMiddleware({ request, context }: any) {
    // const user = await getUserFromSession(request);
    const idUser = await getIdUserFromSession(request);
    if (!idUser) {
        throw redirect("/auth/login");
    }

    // get data to be context ==========
    const user = await getUserByIdUser(idUser)
    const namaSubbidang = await getNamaSubbidang(user.idSubBidang)
    // ===============================================

    context.set(userContext, {
        ...user,
        namaSubbidang
    } satisfies UserContextType);
}

export async function loginMiddleware({ request, context }: any) {
    const idUser = await getIdUserFromSession(request);
    if (idUser) {
        throw redirect(`/${FIRST_SEGMENT}/dashboard`)
    }
}

