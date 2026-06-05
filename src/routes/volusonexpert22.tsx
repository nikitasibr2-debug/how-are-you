import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/volusonexpert22")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "GE Voluson Expert 22 — АстМед" },
      { name: "description", content: "GE Voluson Expert 22 — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="voluson-expert-22-landing" />;
}
