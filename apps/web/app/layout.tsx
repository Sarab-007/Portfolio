import "./globals.css";
import AppProviders from "@/src/providers/app-providers";
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/src/config/site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.summary,

  icons: {
    icon: [
      {
        url: "/dark-avatar.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },

  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.summary,
    type: "website",
  },

  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="site-bg min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
