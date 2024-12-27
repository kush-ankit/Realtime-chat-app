import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "@/providers/socketProviders";

export const metadata: Metadata = {
  title: "stop",
  description: "A messaging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
