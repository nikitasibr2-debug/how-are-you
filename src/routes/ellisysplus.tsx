import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/ellisysplus")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Ellisys Plus S — АстМед" },
      { name: "description", content: "Ellisys Plus S — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="ellisys-plus-s-landing" />;
}
