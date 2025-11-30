import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { UserContextType } from "~/lib/context";

interface ProfilSectionProps {
    user: UserContextType,
    namaTeam: string | null
}

export function ProfilSection({ user, namaTeam }: ProfilSectionProps) {
    return (
        <div className="border-2 rounded-md p-4 flex items-center gap-x-4">
            <div className="w-1/4 flex items-center justify-center">
                <Avatar className="size-60">
                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                    <AvatarFallback className="text-8xl">
                        {user?.nama?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-1">
                <div className="flex flex-col gap-y-2">
                    <h1 className="font-semibold text-7xl">{user.nama}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-muted-foreground">Team : {namaTeam}</p>
                </div>
            </div>
        </div>
    )
}