import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenbu.Store",
  description: "Modern general store with seamless shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
