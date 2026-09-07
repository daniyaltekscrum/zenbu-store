import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zenbu.Store — Curated Lifestyle & General Store",
    template: "%s | Zenbu.Store",
  },
  description:
    "Curated quality goods with Cash on Delivery and instant WhatsApp customer support.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zenbu.store"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
