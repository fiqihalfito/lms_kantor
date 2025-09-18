import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/landing-page/index.tsx"),
    layout("routes/staff/_components/sidebar-layout.tsx", [
        route("dashboard", "routes/staff/index.tsx"),
        route("dokumen", "routes/staff/dokumen/index.tsx")
    ])
] satisfies RouteConfig;
