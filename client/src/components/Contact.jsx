import Avatar from "./Avatar"

export default function Contact({id, username, selected, onClick, online}) {
    return (
        <div
            key={id}
            onClick={() => onClick(id)}
            className={`cursor-pointer border-b border-gray-200 flex items-center gap-2 px-4 py-3 transition-colors ${id === selected ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
        >
            {id === selected && (
                <div className="w-1 bg-blue-500 h-10 rounded-r-md"></div>
            )}
            <div className="flex items-center gap-3">
                <Avatar online={online} username={username} userId={id} />
                <span className="text-gray-800 font-medium">
                    {username}
                </span>
            </div>
        </div>
    )
}