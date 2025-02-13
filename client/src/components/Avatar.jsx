export default function Avatar({ username, userId, online }) {
    const colors = [
        'bg-gradient-to-r from-red-400 to-pink-400',
        'bg-gradient-to-r from-blue-400 to-indigo-400',
        'bg-gradient-to-r from-green-400 to-teal-400',
        'bg-gradient-to-r from-yellow-400 to-orange-400',
        'bg-gradient-to-r from-purple-400 to-pink-400',
        'bg-gradient-to-r from-teal-400 to-green-400',
        'bg-gradient-to-r from-indigo-400 to-blue-400',
        'bg-gradient-to-r from-fuchsia-400 to-pink-500',
        'bg-gradient-to-r from-cyan-400 to-blue-500',
        'bg-gradient-to-r from-lime-400 to-yellow-500',
        'bg-gradient-to-r from-amber-400 to-red-500',
        'bg-gradient-to-r from-violet-400 to-blue-600',
        'bg-gradient-to-r from-pink-400 to-purple-500',
        'bg-gradient-to-r from-gray-400 to-slate-600',
        'bg-gradient-to-r from-rose-400 to-pink-600'
    ];

    const emojis = [
        '😊', '😎', '🤩', '😇', '😁',
        '😍', '😜', '🥳', '😻', '😌',
        '😋', '🤗', '🥺', '🙃', '😄',
        '😃', '😅', '😆', '🤪', '😝'
    ];

    const userIdBase10 = parseInt(userId, 16);
    const avatarColorClass = colors[userIdBase10 % colors.length];
    const emoji = emojis[userIdBase10 % emojis.length]; 

    const shadowColor = avatarColorClass.replace('bg-gradient-to-r from-', '').replace(' to-', ''); // Estrae il primo colore dal gradiente

    return (
        <div
            className={`w-12 h-12 ${avatarColorClass} rounded-full flex items-center justify-center shadow-xl relative`}
            style={{
                boxShadow: `0px 4px 6px rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, 0.4)`
            }}
            
        >
            
            <div className="text-center text-2xl font-bold text-white">
                {username?.[0]?.toUpperCase()}
            </div>
            
            <div className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl">
                {emoji}
            </div>
            {online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border border-white"></div>
            )}
            {!online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full border border-white"></div>
            )}
        </div>
    );
}
