import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/dc90")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Mindray DC-90 — АстМед" },
      { name: "description", content: "Mindray DC-90 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="mindray-dc-90-landing" />;
}
