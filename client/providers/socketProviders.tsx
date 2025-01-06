"use client"
import { serverURI } from '@/utils/serverURI';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(serverURI);
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
