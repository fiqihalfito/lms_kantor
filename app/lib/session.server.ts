import type { mUser } from "database/schema/schema";
import { createCookieSessionStorage } from "react-router";

export type FlashData = {
    type: "success" | "error";
    message: string;
};

let SESSION_FLASH_KEY = "flashMessage"
export type SessionFlashMessage = {
    [SESSION_FLASH_KEY]: FlashData
}

export type UserDataForSession = Omit<typeof mUser.$inferSelect, "password">
export type SessionUser = UserDataForSession & { namaSubbidang: string }
export let SESSION_KEY = 'user'

// !!! important part =======================================>>>>>>>>>>>>>>>>>>
export const sessionStorage = createCookieSessionStorage<
    {
        [SESSION_KEY]: SessionUser
    },
    SessionFlashMessage
>({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === 'production',
    },
})

export const getSession = async (request: Request) => {
    return await sessionStorage.getSession(request.headers.get('Cookie'))
}

export const getUserFromSession = async (request: Request) => {
    const session = await getSession(request)
    return session?.get(SESSION_KEY)
}

export const saveSession = async (request: Request, user: SessionUser) => {
    const session = await getSession(request)
    session.set(SESSION_KEY, user)
    return new Headers({
        'Set-Cookie': await sessionStorage.commitSession(session),
    })
}

export async function destroySession(request: Request) {
    const session = await getSession(request)
    return new Headers({
        'Set-Cookie': await sessionStorage.destroySession(session),
    })
}

// Flash Function  =======================================================================
export async function setFlashSession(request: Request, value: FlashData) {
    const session = await getSession(request)
    session.flash(SESSION_FLASH_KEY, value)
    return new Headers({
        'Set-Cookie': await sessionStorage.commitSession(session),
    })
}

export async function getFlashSession(request: Request) {
    const session = await getSession(request)
    const flashData = session.get(SESSION_FLASH_KEY) as FlashData | undefined // ini menghapus key
    const headers = new Headers({
        "Set-Cookie": await sessionStorage.commitSession(session), // commit setelah get()
    })

    return { headers, flashData }
}