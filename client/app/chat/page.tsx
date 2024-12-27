"use client"
import { SocketContext } from "@/providers/socketProviders";
import { useContext, useEffect } from "react";


export default function Page() {
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', 'myroom');
        }
        return () => {
            socket?.off('joinRoom');
        };
    }, [socket]);

    function handleclick() {
        socket?.emit('allUser')
    }




    return (
        <main className="w-full h-full ">
            <button onClick={handleclick} className="m-auto outline outline-1 p-2">Click</button>
        </main>
    )
}
