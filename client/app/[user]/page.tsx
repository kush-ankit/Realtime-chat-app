"use client"
import ChatList, { IChatItem } from "@/components/chatList";
import { useContext, useEffect, useState } from "react";
import Chat from "@/components/chat";
import { SocketContext } from "@/providers/socketProviders";
import { useUserStore } from "@/utils/states";



export default function ChatPage() {
    const socket = useContext(SocketContext);
    const [chatList, setChatList] = useState(null)
    const [selectedChat, setSelectedChat] = useState<IChatItem | null>(null);


    useEffect(() => {
        socket?.on('users', (users) => {
            console.log(users)
            setChatList(users)
        })
        socket?.on("receive-message", (data) => {
            console.log('message recieved', data);
        });

        return () => {
            socket?.off("receive-message");
        };
    }, [socket])


    return (
        <div className="md:flex">
            <ChatList chats={chatList} onSelectChat={setSelectedChat} />
            <div className="block w-full">
                {
                    selectedChat && socket && (
                        <Chat
                            chat={selectedChat}
                        />
                    )
                }
            </div>
        </div>
    );
}
