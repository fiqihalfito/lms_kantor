import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/landing-page/index.tsx"),

    ...prefix("auth", [
        route("login", "routes/auth/login/index.tsx"),
        route("logout", "routes/auth/logout/index.tsx")
    ]),

    route("app", "routes/app/index.tsx", { id: "app_segment" }, [

        // staff
        layout("routes/staff/_components/sidebar-layout.tsx", [
            // index("routes/staff/layout-index.tsx"),
            route("dashboard", "routes/staff/index.tsx"),

            ...prefix("dokumen", [
                route(":tipeDokumen", "routes/staff/dokumen/tipe/index.tsx", [
                    route("preview/:idDokumen", "routes/staff/dokumen/tipe/preview-pdf/index.tsx"),
                    route("new", "routes/staff/dokumen/tipe/add/index.tsx"),
                    route("edit/:idDokumen", "routes/staff/dokumen/tipe/edit/index.tsx"),
                    route("delete", "routes/staff/dokumen/tipe/delete/index.tsx"),
                ]),
                // route("storage/:bucket/:filename", "routes/staff/dokumen/preview-pdf/index.tsx")
            ]),

            ...prefix("kuis", [
                index("routes/staff/kuis/index.tsx"),
                route("my-kuis", "routes/staff/kuis/my-kuis/index.tsx", [
                    route("preview/:idDokumen", "routes/staff/kuis/preview-pdf/index.tsx")
                ]),
                route("kuis-maker/:idDokumen", "routes/staff/kuis/kuis-maker/index.tsx")

            ]),

            ...prefix("master", [
                index("routes/staff/master/index.tsx"),
                route("layanan", "routes/staff/master/layanan/index.tsx", [
                    route("new", "routes/staff/master/layanan/new/index.tsx"),
                    route("delete", "routes/staff/master/layanan/delete/index.tsx"),
                    route("edit/:idLayanan", "routes/staff/master/layanan/edit/index.tsx"),
                ]),
                route("user", "routes/staff/master/user/index.tsx", [
                    route("new", "routes/staff/master/user/new/index.tsx"),
                    route("delete", "routes/staff/master/user/delete/index.tsx"),
                    route("edit/:idUser", "routes/staff/master/user/edit/index.tsx"),
                ]),
                route("team", "routes/staff/master/team/index.tsx", [
                    route("new", "routes/staff/master/team/new/index.tsx"),
                    route("delete", "routes/staff/master/team/delete/index.tsx"),
                    route("edit/:idTeam", "routes/staff/master/team/edit/index.tsx"),
                ]),
                route("member_team", "routes/staff/master/member_team/index.tsx", [
                    route(":idTeam", "routes/staff/master/member_team/team.tsx", [
                        // route("new", "routes/staff/master/member_team/new/index.tsx"),
                        // route("delete", "routes/staff/master/member_team/delete/index.tsx"),
                        route("transfer", "routes/staff/master/member_team/transfer/index.tsx"),
                        // route("edit/:idMemberTeam", "routes/staff/master/member_team/edit/index.tsx"),
                    ]),
                ]),
            ])
        ])
    ])


] satisfies RouteConfig;
