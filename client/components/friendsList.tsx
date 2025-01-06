import Image from "next/image";
import React from "react";

type Friend = {
    id: string;
    name: string;
    profilePicture: string;
    isOnline: boolean;
};

interface FriendListProps {
    friends: Friend[];
    onChatSelect: (friend: Friend) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onChatSelect }) => {
    return (
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-4 text-white">
            <h2 className="text-xl font-semibold mb-4 text-center">Friends List</h2>
            <ul className="space-y-4">
                {friends.map((friend) => (
                    <li
                        key={friend.id}
                        className="flex items-center justify-between bg-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition"
                        onClick={() => onChatSelect(friend)}
                    >
                        <div className="flex items-center space-x-3">
                            <Image
                                src={friend.profilePicture}
                                alt={`${friend.name}'s profile`}
                                className="w-12 h-12 rounded-full border-2 border-gray-600"
                            />
                            <div>
                                <p className="font-medium">{friend.name}</p>
                                <p
                                    className={`text-sm ${friend.isOnline ? "text-green-400" : "text-gray-400"
                                        }`}
                                >
                                    {friend.isOnline ? "Online" : "Offline"}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`w-3 h-3 rounded-full ${friend.isOnline ? "bg-green-400" : "bg-gray-400"
                                }`}
                        ></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendList;
