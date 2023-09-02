import { Elysia } from "elysia";
import { fileLogger } from "@bogeychan/elysia-logger";
import fs from "fs/promises";
import process from "process";
import Home from "./views/home";
import React from "react";
import { renderToString } from "react-dom/server";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

if (import.meta.main) {
  // Creates log dir
  const startup = new Date();
  const logDir =
    `${process.cwd()}/logs/${startup.getFullYear()}/${startup.getMonth()}/${startup.getDate()}`;
  await fs.mkdir(logDir, { recursive: true });

  const app = new Elysia()
    .use(staticPlugin())
    .use(html())
    .use(fileLogger({
      file:
        `${logDir}/log-${startup.getFullYear()}-${startup.getMonth()}-${startup.getDate()}.txt`,
    }))
    .get("/", ({ set }) => {
      set.headers = {
        "Content-Type": "text/html",
      };

      return renderToString(<Home title={"Zig Online!"} />);
    }).listen(8080);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}
