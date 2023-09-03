import { FrontMatterResult } from "front-matter";
import { PostContent } from "../lib/posts";
import React from "react";

export default function Article(props: { attributes: PostContent, body: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.attributes.title}</title>
      </head>
      <body>
        <article className="prose lg:prose-lg">
            {props.body}
        </article>
      </body>
    </html>
  );
}
