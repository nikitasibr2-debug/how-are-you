import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/duetv")({
  component: LandingRoute,
  head: () => ({
    meta: [
      { title: "Duet V — АстМед" },
      { name: "description", content: "Duet V — описание, характеристики и цена. Поставка от официального дистрибьютора АстМед." },
    ],
  }),
});

function LandingRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App initialTab="duet-v-landing" />;
}
