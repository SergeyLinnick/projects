"use client";

import { Button } from "@workspace/ui";

type ErrorProps = {
  error: Error;
  reset?: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>

        {reset && <Button onClick={reset}>Try again</Button>}
      </div>
    </div>
  );
}
