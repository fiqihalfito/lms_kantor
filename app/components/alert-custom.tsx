import { CheckCircle2Icon, CircleAlertIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

type MyAlertProp = {
    status: "success" | "error",
    title: string,
    desc?: string,
    className?: string
}

export function MyAlert({ status, title, desc, className }: MyAlertProp) {
    return (
        <Alert className={className} variant={status === "success" ? "default" : "destructive"}>
            {status === "success" && <CheckCircle2Icon />}
            {status === "error" && <CircleAlertIcon />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {desc}
            </AlertDescription>
        </Alert>
    )
}