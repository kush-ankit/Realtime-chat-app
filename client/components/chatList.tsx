export interface IChatItem {
  id: string;
  name: string;
  type: "friend" | "group";
  isOnline?: boolean;
}

interface ChatListProps {
  chats: IChatItem[] | null;
  onSelectChat: (chat: IChatItem) => void;
}

export default function ChatItem({ chats, onSelectChat }: ChatListProps) {

  return (
    <div className="w-full md:w-1/3 bg-gray-800 text-white h-screen space-y-3">
      <h2 className="text-lg font-semibold bg-gray-700 p-4 md:p-3">Chats</h2>
      <ul className="flex flex-col md:gap-3 gap-2 md:p-2 p-1">
        {chats?.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-700"
            onClick={() => onSelectChat(chat)}
          >
            <span className="flex-1">{chat.name}</span>
            <span className="text-xs bg-blue-600 px-2 py-1 rounded">
              {chat.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
