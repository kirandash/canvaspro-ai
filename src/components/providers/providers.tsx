"use client";
import QueryProvider from "@/components/providers/query-provider";
import React, { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
