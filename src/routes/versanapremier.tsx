import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/versanapremier")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "GE Versana Premier — АстМед" },
      { name: "description", content: "GE Versana Premier — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="versana-premier-landing" />;
}
