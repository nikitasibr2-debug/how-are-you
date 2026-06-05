import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/contlex")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Contlex SMAS — АстМед" },
      { name: "description", content: "Contlex SMAS — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="contlex-landing" />;
}
