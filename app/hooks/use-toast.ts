
import { useEffect } from "react";
import type { ToastMessage } from "remix-toast";
import { toast as notify } from "sonner"


export function useToastEffect(toast?: ToastMessage) {
    useEffect(() => {
        if (!toast) return;

        // const opts = { position: "top-center" };

        if (toast.type === "success") {
            notify.success(toast.message, { position: "top-center" });
        } else if (toast.type === "error") {
            notify.error(toast.message, { position: "top-center" });
        }
    }, [toast]);
}