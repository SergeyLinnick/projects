"use client";

import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

import type { Snippet as SnippetType } from ".contentlayer/generated";
import Pre from "./pre";

const components = {
  pre: Pre,
};

export function Snippet({ snippet }: { snippet: SnippetType }) {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Always call useMDXComponent with a safe fallback
  // This ensures the hook is called unconditionally
  const MDXContent = useMDXComponent(snippet?.body?.code || "");

  // Add safety checks for the snippet data
  if (!snippet?.body?.code) {
    console.error("Invalid snippet data:", snippet);
    return <div>Error: Invalid snippet data</div>;
  }

  // Don't render MDX until after hydration
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  // Check if MDX content is valid
  if (!MDXContent || typeof MDXContent !== "function") {
    return <div>Error: Could not render snippet</div>;
  }

  try {
    return <MDXContent components={components} />;
  } catch (error) {
    console.error("Error rendering MDX:", error);
    return <div>Error rendering snippet</div>;
  }
}
