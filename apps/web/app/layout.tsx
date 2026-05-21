import "./globals.css";
import AppProviders from "@/src/providers/app-providers";
import ScrollProgress from "@/src/components/cinematic/scroll-progress";
import SmoothScroll from "@/src/providers/smooth-scroll";
import { siteConfig } from "@/src/config/site";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe8" },
    { media: "(prefers-color-scheme: dark)", color: "#06070a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${siteConfig.name} - ${siteConfig.role}`,
  description: siteConfig.summary,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Angular Developer",
    "Node.js",
    "Spring Boot",
    "Enterprise Web Applications",
    "Sarab A. Khan",
  ],
  icons: {
    icon: [
      { url: "/dark-avatar.svg", type: "image/svg+xml" },
      {
        url: "/light-avatar.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.summary,
    type: "website",
    images: [{ url: "/avatar.png", width: 1000, height: 1000 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.summary,
    images: ["/avatar.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="site-bg" suppressHydrationWarning>
        <div className="cinematic-noise" aria-hidden="true" />
        <div className="cinematic-vignette" aria-hidden="true" />
        <AppProviders>
          <SmoothScroll>
            <ScrollProgress />
            <div className="relative z-10">{children}</div>
          </SmoothScroll>
        </AppProviders>
      </body>
    </html>
  );
}
