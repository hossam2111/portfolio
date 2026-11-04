import type { Metadata } from "next";
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
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-ink font-sans text-paper antialiased selection:bg-signal/25 selection:text-paper">
        {/* Accessible skip-to-content link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-xl focus:bg-signal focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          Skip to main content
        </a>

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
