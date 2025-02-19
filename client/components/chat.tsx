"use client"
import { SocketContext } from "@/providers/socketProviders";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IChatItem } from "@/components/chatList";
import { Socket } from "socket.io-client";
import { useUserStore } from "@/utils/states";

interface Message {
    sender: 'user' | 'friend';
    content: string;
}

export default function Chat({ chat }: { chat: IChatItem }) {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const userId = useUserStore((state: any) => state.userId);


    useEffect(() => {
        socket?.on("receive-message", (data) => {
            console.log('message recieved', data);

            setMessages([...messages, { sender: 'friend', content: data.message }]);
        });

        return () => {
            socket?.off("receive-message");
        };
    }, [chat.userId, messages, socket]);


    const handleSend = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (socket) {
            socket.emit('private-message', { senderId: userId, receiverId: chat.userId, message: input });
        }
        if (input.trim()) {

            setMessages([...messages, { sender: 'user', content: input }]);
            setInput('');
        }
    };


    return (
        <div className="flex flex-col h-screen bg-gray-100 w-full">
            <div className="bg-blue-600 text-white py-4 px-6 text-lg font-semibold">
                Chat Room of {chat.name}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-screen ${msg.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>


            <form className="bg-white p-4 flex items-center border-t text-black" onSubmit={handleSend}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );
}