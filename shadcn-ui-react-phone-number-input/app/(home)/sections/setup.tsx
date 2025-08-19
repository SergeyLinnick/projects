"use client";

import type { Snippet as SnippetType } from "contentlayer/generated";
import { useEffect, useState } from "react";

import CodeBlock from "@/components/code-block";
import { Snippet } from "@/components/snippet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Setup() {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically import contentlayer data to avoid SSR issues
    import("contentlayer/generated")
      .then(({ allSnippets }) => {
        const sortedSnippets = allSnippets.sort((a, b) => a.order - b.order);
        setSnippets(sortedSnippets);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load snippets:", error);
        setLoading(false);
      });
  }, []);
  return (
    <section id="setup" className="w-full max-w-5xl py-8">
      <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Setup
      </h2>
      <div className="w-full">
        <h3 className="font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
          Install Shadcn via CLI
        </h3>
        <p className="text-normal leading-7 [&:not(:first-child)]:mt-6">
          Run the{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            shadcn-ui
          </code>{" "}
          init command to setup your project:
        </p>
        <CodeBlock value="npx shadcn@latest init" className="mt-2" />
      </div>
      <div className="w-full">
        <h3 className="font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
          Install necessary Shadcn components:
        </h3>
        <p className="text-normal leading-7 [&:not(:first-child)]:mt-6">
          Run the{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            shadcn
          </code>{" "}
          add command to add the necessary shadcn components to your project:
        </p>
        <div data-rehype-pretty-code-fragment="">
          <CodeBlock
            className="mt-2"
            value={`npx shadcn@latest add input\nnpx shadcn@latest add button\nnpx shadcn@latest add command\nnpx shadcn@latest add toast\nnpx shadcn@latest add popover\nnpx shadcn@latest add scroll-area`}
          />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
          Install necessary React Phone Number Input package:
        </h3>
        <CodeBlock
          value={"npm install react-phone-number-input"}
          className="mt-2"
        />
      </div>
      <div className="w-full">
        <h3 className="font-heading mt-8 scroll-m-20 pb-2 text-lg font-semibold tracking-tight">
          To use the phone input component:
        </h3>
        {/* <ul className="list-decimal list-outside ml-5 marker:text-muted-foreground space-y-3 text-sm">
          {snippets.map((snippet) => (
            <li key={snippet.file}>
              Copy & paste{" "}
              <a href={`#${snippet.file}`} className="font-mono underline hover:no-underline">
                {snippet.file}
              </a>
            </li>
          ))}
        </ul> */}
        <div className="mt-10 flex flex-col">
          <h3 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            Snippets
          </h3>
          {loading ? (
            <p>Loading snippets...</p>
          ) : snippets.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              defaultValue={snippets[0]?.file}
            >
              {snippets.map((snippet) => (
                <AccordionItem key={snippet.slug} value={snippet.file}>
                  <AccordionTrigger id={snippet.file}>
                    <code>{snippet.file}</code>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Snippet snippet={snippet} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p>No snippets available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
