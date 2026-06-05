import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/logiqfortis")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "GE Logiq Fortis R4 — АстМед" },
      { name: "description", content: "GE Logiq Fortis R4 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="logiq-fortis-r4-landing" />;
}
