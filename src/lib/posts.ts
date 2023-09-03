import fs from "fs/promises"
import fm, { FrontMatterResult } from "front-matter"
import { t } from "elysia"

export async function loadPost(pathname: string): Promise<Response | FrontMatterResult<PostContent>> {
    const file = Bun.file(`data/posts/${pathname}.md`);
    if (!await file.exists()) {
        return new Response("Post not found", {
            "status": 404
        })
    }

    const text = await file.text();
    const data = fm<PostContent>(text);

    return Promise.resolve(data);
}

const postFrontMatter = t.Object({
    title: t.String(),
    desc: t.Optional(t.String()),
    lang: t.Optional(t.String()),
    version: t.Optional(t.String()),
    tags: t.Array(t.String())
})

export type PostContent = typeof postFrontMatter;