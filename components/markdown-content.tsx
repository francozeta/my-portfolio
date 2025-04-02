"use client"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MarkdownContentProps {
  source: MDXRemoteSerializeResult
}

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 text-neutral-300" {...props} />,
  a: (props: any) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-neutral-300" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-neutral-700 pl-4 italic my-4" {...props} />,
  code: (props: any) => {
    if (props.className?.includes("language-")) {
      return (
        <div className="my-4 rounded-lg overflow-hidden">
          <pre className="p-4 bg-neutral-900 overflow-x-auto">
            <code {...props} />
          </pre>
        </div>
      )
    }
    return <code className="bg-neutral-800 text-neutral-200 rounded px-1 py-0.5 text-sm font-mono" {...props} />
  },
  pre: (props: any) => <pre className="overflow-auto" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-neutral-700" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-300 bg-neutral-800" {...props} />
  ),
  td: (props: any) => <td className="px-4 py-3 text-sm border-t border-neutral-800" {...props} />,
  hr: () => <hr className="my-8 border-neutral-800" />,
}

export function MarkdownContent({ source }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  )
}

export function ProjectLinks({ repoUrl, demoUrl }: { repoUrl?: string; demoUrl?: string }) {
  return (
    <div className="flex flex-wrap gap-4 my-6">
      {demoUrl && (
        <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
      {repoUrl && (
        <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
            <Github className="mr-2 h-4 w-4" /> Ver Repositorio
          </Button>
        </Link>
      )}
    </div>
  )
}

