import { Outlet, useNavigate, useNavigation } from "react-router"
import { AppSidebar } from "./app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty"
import { Spinner } from "~/components/ui/spinner"

export default function SidebarLayout() {

    const navigation = useNavigation()
    const isLoading = Boolean(navigation.location)

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 relative">
                    {isLoading && <LoadingOutlet />}
                    <Outlet />

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

function LoadingOutlet() {
    return (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Spinner />
                    </EmptyMedia>
                    <EmptyTitle>Sedang Memuat</EmptyTitle>
                </EmptyHeader>
            </Empty>
        </div>

    )
}
