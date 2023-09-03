import { Elysia } from "elysia";
import Home from "./views/home";
import React from "react";
import { renderToString } from "react-dom/server";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { cookie } from "@elysiajs/cookie";

// Database
import { logger } from "./lib/logger";

if (import.meta.main) {

  const app = new Elysia()
    .use(cookie())
    .use(staticPlugin())
    .use(html())
    .use(logger())
    .get("/", ({ set }) => {
      set.headers = {
        "Content-Type": "text/html",
      };

      return renderToString(<Home title={"Helpful"} />);
    }).listen(8080);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}
