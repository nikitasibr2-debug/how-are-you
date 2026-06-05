import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/consonan8")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Mindray Consona N8 — АстМед" },
      { name: "description", content: "Mindray Consona N8 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="mindray-consona-n8-landing" />;
}
