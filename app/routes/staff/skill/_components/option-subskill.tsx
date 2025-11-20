
import { EyeIcon, FileUpIcon, GithubIcon, MoreHorizontalIcon, PencilIcon, PencilLineIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { FIRST_SEGMENT } from "~/lib/route-config"

type OptionSubskillType = {
    idSubSkill: string
    idDokumen: string | null,
    idKuis: string | null,
    idTeam?: string | null
}

export function OptionSubskill({ idDokumen, idKuis, idSubSkill, idTeam }: OptionSubskillType) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" aria-label="Open menu" size="icon-sm">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuLabel>Dokumen</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {idDokumen && (
                        <DropdownMenuItem asChild>
                            <Link to={`${idDokumen}/preview-dokumen`} viewTransition>
                                <EyeIcon className="mr-2" />
                                <span>Baca</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    {!idDokumen ? (
                        <DropdownMenuItem asChild>
                            <Link to={`${idSubSkill}/team/${idTeam}/upload-dokumen`} viewTransition>
                                <FileUpIcon className="mr-2" />
                                <span>Upload</span>
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem asChild>
                            <Link to={`${idSubSkill}/team/${idTeam}/edit-dokumen/${idDokumen}`} viewTransition>
                                <PencilIcon className="mr-2" />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Kuis</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link to={`../kuis/buat-kuis/kuis-maker/${idDokumen}`} viewTransition>
                            <PencilLineIcon className="mr-2" />
                            <span>Buat Kuis</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}