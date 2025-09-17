import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing-page/index.tsx"),
    route("dashboard", "routes/staff/index.tsx"),
] satisfies RouteConfig;
