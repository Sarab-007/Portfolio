"use client";
import ThemeProvider from "./theme-provider";
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
