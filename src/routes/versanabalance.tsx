import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/versanabalance")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "GE Versana Balance R2 — АстМед" },
      { name: "description", content: "GE Versana Balance R2 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="ge-versana-balance-r2-landing" />;
}
