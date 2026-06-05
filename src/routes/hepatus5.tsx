import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/hepatus5")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Mindray Hepatus 5 — АстМед" },
      { name: "description", content: "Mindray Hepatus 5 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="mindray-hepatus-5-landing" />;
}
