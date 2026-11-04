import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { PROFILE } from "@/data/profile";
import { Spotlight } from "@/components/Spotlight";
import { CommandPalette } from "@/components/CommandPalette";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.meta.siteUrl),
  title: {
    default: PROFILE.meta.siteTitle,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.meta.siteDescription,
  keywords: PROFILE.meta.keywords,
  authors: [{ name: PROFILE.name, url: PROFILE.meta.siteUrl }],
  creator: PROFILE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PROFILE.meta.siteUrl,
    title: PROFILE.meta.siteTitle,
    description: PROFILE.meta.siteDescription,
    siteName: `${PROFILE.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: PROFILE.meta.siteTitle,
    description: PROFILE.meta.siteDescription,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-background font-sans text-slate-300 antialiased selection:bg-accent/25 selection:text-accent">
        {/* Accessible skip-to-content link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-slate-950 focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Subtle noise/grain texture overlay */}
        <div className="pointer-events-none fixed inset-0 z-20 bg-grain opacity-40" />

        {/* Cursor radial spotlight */}
        <Spotlight />

        {/* Command palette (⌘K) */}
        <CommandPalette />

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
