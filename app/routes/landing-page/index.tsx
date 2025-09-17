import type { Route } from "./+types/index";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Link } from "react-router";
import { BackgroundPattern } from "./_components/background-pattern";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Learning Management System" },
    { name: "description", content: "Welcome to LMS!" },
  ];
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-3xl">
        <Badge
          variant="secondary"
          className="rounded-full py-1 border-border"
          asChild
        >
          <Link to="#">
            Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-semibold tracking-tighter">
          Learning Management System
        </h1>
        <p className="mt-6 md:text-lg">
          Aplikasi Pembelajaran Bidang Aplikasi PLN - Korporat dan Pelayanan Pelanggan
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link to={"/dashboard"}>
            <Button size="lg" className="rounded-full text-base cursor-pointer">
              Get Started <ArrowUpRight className="h-5! w-5!" />
            </Button>
          </Link>

          {/* <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="h-5! w-5!" /> Watch Demo
          </Button> */}
        </div>
      </div>
    </div>
  )
}
