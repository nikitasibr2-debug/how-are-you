import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/resonai9")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Mindray Resona I9 — АстМед" },
      { name: "description", content: "Mindray Resona I9 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="mindray-resona-i9-landing" />;
}
