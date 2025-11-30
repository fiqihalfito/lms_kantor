import { FilePlusIcon } from "lucide-react";
import { data, Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { getSkillAndSubSkillByPIC } from "./_service";
import { userContext } from "~/lib/context";
import { ListSkillSubskill } from "./_components/list-skill-subskill";
import { getToast } from "remix-toast";
import { useToastEffect } from "~/hooks/use-toast";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const skillAndSubskill = await getSkillAndSubSkillByPIC(user.idSubBidang, user.idUser)

    // toast
    const { headers, toast } = await getToast(request)



    return data({ skillAndSubskill, toast }, { headers })
}


export default function SkillPage({ loaderData }: Route.ComponentProps) {

    const { skillAndSubskill, toast } = loaderData

    useToastEffect(toast)

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Skill</h1>
                    <p className="text-muted-foreground">PIC Subskill upload dokumen dan membuat kuis</p>
                </div>
                {/* <Link to={`new`}>
                    <Button className="cursor-pointer" size={"lg"} >
                        <FilePlusIcon className="size-5" />
                        Tambah Dokumen { }
                    </Button>
                </Link> */}

            </div>

            <Separator />

            <div className="">
                <ListSkillSubskill skillAndSubskill={skillAndSubskill} />
            </div>

            <Outlet />
        </div>
    )
}