"use client"
import ChatList, { IChatItem } from "@/components/chatList";
import { useState } from "react";
import Page from "./chat/page";

const sampleChats: IChatItem[] = [
    { id: "1", name: "Alice", type: "friend", isOnline: true },
    { id: "2", name: "Bob", type: "friend", isOnline: false },
    { id: "3", name: "Study Group", type: "group" },
];

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState<IChatItem | null>(null);

    return (
        <div className="md:flex">
            <ChatList chats={sampleChats} onSelectChat={setSelectedChat} />
            <div className="hidden md:block w-full">
                <Page />
            </div>
        </div>
    );
}
