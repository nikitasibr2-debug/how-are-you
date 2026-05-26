import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "../App";

export const Route = createFileRoute("/")({
  component: IndexRoute,
  head: () => ({
    meta: [
      { title: "АстМед — Федеральный дистрибьютор медицинского оборудования" },
      {
        name: "description",
        content:
          "АстМед — официальный дистрибьютор профессионального медицинского и косметологического оборудования. Лизинг, обучение, сервис и поставка под ключ.",
      },
    ],
  }),
});

function IndexRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App />;
}
