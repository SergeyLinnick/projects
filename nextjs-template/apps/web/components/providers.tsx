"use client";

import * as React from "react";

import { ApiProvider } from "@workspace/api";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApiProvider>{children}</ApiProvider>;
}
