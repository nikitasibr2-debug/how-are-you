import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/robolex")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Robolex — АстМед" },
      { name: "description", content: "Robolex — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="robolex-landing" />;
}
