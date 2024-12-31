import { SocketProvider } from "@/providers/socketProviders";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    );
}