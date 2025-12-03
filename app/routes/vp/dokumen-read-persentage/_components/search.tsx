import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { Form, useSearchParams } from "react-router";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group";

export function Search({ search }: { search: string | null }) {

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const searchField = document.getElementById("search");
        if (searchField instanceof HTMLInputElement) {
            searchField.value = search || "";
        }
    }, [search]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const currSearch = formData.get("search") as string | null
        setSearchParams((searchParams) => {
            searchParams.set("search", currSearch ?? "");
            return searchParams;
        });
    }

    return (
        <Form method="GET" onSubmit={handleSubmit}>
            <InputGroup className="w-sm">
                <InputGroupInput id="search" placeholder="Cari Dokumen..." name="search" />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
        </Form>

    )
}