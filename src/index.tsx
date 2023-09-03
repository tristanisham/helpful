import { Elysia } from "elysia";
import Home from "./views/home";
import React from "react";
import { renderToString } from "react-dom/server";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { cookie } from "@elysiajs/cookie";

// Database
import { logger } from "./lib/logger";
import Database from "bun:sqlite";
import * as routes from "./controllers";
import { loadPost } from "./lib/posts";
import Article from "./views/article";

if (import.meta.main) {
  const db = new Database(":memory:");

  const app = new Elysia()
    .use(cookie())
    .use(staticPlugin())
    .state("db", db)
    .use(html())
    .use(logger())
    .get("/", routes.homeGET)
    .get("/:slug", async ({ set, params: { slug } }) => {
      const post = await loadPost(slug);
      if (post instanceof Response) return post;

      set.headers = {
        "Content-Type": "text/html",
      };
      return renderToString(
        <Article attributes={post.attributes} body={post.body} />,
      );
    }).listen(8080);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}
