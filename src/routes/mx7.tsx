import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/mx7")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Mindray MX7 — АстМед" },
      { name: "description", content: "Mindray MX7 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="mindray-mx7-landing" />;
}
