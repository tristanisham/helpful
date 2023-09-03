import { Context } from "elysia";
import Home from "./views/home";
import { renderToString } from "react-dom/server";
import React from "react";

export function homeGET({ set }: Context): string {
  set.headers = {
    "Content-Type": "text/html",
  };

  return renderToString(<Home title={"Helpful"} />);
}
