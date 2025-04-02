import { serialize } from "next-mdx-remote/serialize"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

export async function serializeMarkdown(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
  })
}

