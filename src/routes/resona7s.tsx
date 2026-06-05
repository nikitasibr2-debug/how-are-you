import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/resona7s")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Mindray Resona 7s — АстМед" },
      { name: "description", content: "Mindray Resona 7s — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="mindray-resona-7s-landing" />;
}
