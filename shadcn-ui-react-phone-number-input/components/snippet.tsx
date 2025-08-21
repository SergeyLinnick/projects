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
  const [hasError, setHasError] = React.useState(false);

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

  // Wrap the MDX content in an error boundary
  if (hasError) {
    return (
      <div className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-md border p-8 text-center">
        <h3 className="mb-4 text-lg font-semibold">Snippet Rendering Error</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          There was an error rendering this code snippet.
        </p>
        <button
          onClick={() => setHasError(false)}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  try {
    return (
      <div onError={() => setHasError(true)}>
        <MDXContent components={components} />
      </div>
    );
  } catch (error) {
    console.error("Error rendering MDX:", error);
    setHasError(true);
    return null;
  }
}
