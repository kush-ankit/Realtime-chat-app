"use client"
import ChatList, { IChatItem } from "@/components/chatList";
import { useContext, useEffect, useState } from "react";
import Chat from "@/components/chat";
import { SocketContext } from "@/providers/socketProviders";



export default function ChatPage() {
    const socket = useContext(SocketContext);
    const [chatList, setChatList] = useState(null)

    useEffect(() => {
        socket?.on('users', (users) => {
            console.log(users);
            setChatList(users)
        })
    }, [socket])

    const [selectedChat, setSelectedChat] = useState<IChatItem | null>(null);

    return (
        <div className="md:flex">
            <ChatList chats={chatList} onSelectChat={setSelectedChat} />
            <div className="hidden md:block w-full">
                <Chat />
            </div>
        </div>
    );
}
