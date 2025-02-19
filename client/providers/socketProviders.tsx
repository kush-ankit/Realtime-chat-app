"use client"
import { serverURI } from '@/utils/serverURI';
import { useUserStore } from '@/utils/states';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const name = useUserStore((state: any) => state.name);
    const email = useUserStore((state: any) => state.email);
    const userId = useUserStore((state: any) => state.userId);

    useEffect(() => {
        const newSocket = io(serverURI, { auth: { username: name, uid: userId } });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
