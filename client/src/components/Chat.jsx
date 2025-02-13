import { useEffect, useState, useContext, useRef } from 'react';
import Contact from './Contact';
import Logo from './Logo';

import { UserContext } from '../UserContext';
import { set, uniqBy } from 'lodash';
import { use } from 'react';
import axios from 'axios'

const Chat = () => {
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [offlinePeople, setOfflinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const { username, id } = useContext(UserContext);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        connectToWs();
    }, []);

    function connectToWs() {
        const ws = new WebSocket('ws://localhost:4040');
        setWs(ws);
        ws.addEventListener('message', handleMessage);
        ws.addEventListener('close', () => {
            setTimeout(() => {
                console.log('Reconnecting...');
                connectToWs();
            }, 1000);
        });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        axios.get('/people').then(res => {
            const offlinePeopleArr = res.data
                .filter(p => p._id !== id)
                .filter(p => !Object.keys(onlinePeople).includes(p._id));
            const offlinePeople = {};
            offlinePeopleArr.forEach(p => {
                offlinePeople[p._id] = p;
            });
            setOfflinePeople(offlinePeople);
        });

    }, [onlinePeople]);

    useEffect(() => {
        if (selectedUserId) {
            axios.get('/messages/'+selectedUserId).then(res => {
                setMessages(res.data);
            })
        }
    }, [selectedUserId]);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }

    function showOnlinePeople(peopleArray) {
        const people = {};
        peopleArray.forEach(({ userId, username }) => {
            people[userId] = username;
        });
        setOnlinePeople(people);
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        if ('online' in messageData) {
            showOnlinePeople(messageData.online);
        } else if ('text' in messageData) {
            setMessages(prev => ([...prev, { ...messageData }]));
        }
    }

    function sendMessage(ev) {
        ev.preventDefault();
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: newMessageText,
        }));
        setNewMessageText('');
        setMessages(prev => ([...prev, {
            text: newMessageText,
            sender: id,
            recipient: selectedUserId,
            _id: Date.now(),
        }]));
    }

    const onlinePeopleExclMe = { ...onlinePeople };
    delete onlinePeopleExclMe[id];
    const messagesWithoutDupes = uniqBy(messages, '_id');

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="bg-white w-1/3 border-r border-gray-200">
                <Logo />
                {Object.keys(onlinePeopleExclMe).map((userId) => (
                    <Contact 
                        key = {userId}
                        id={userId} 
                        online = {true}
                        username={onlinePeopleExclMe[userId]} 
                        selected={selectedUserId === userId}
                        onClick={() => setSelectedUserId(userId)}  />
                ))}
                {Object.keys(offlinePeople).map((userId) => (
                    <Contact 
                        key = {userId}
                        id={userId} 
                        online = {false}
                        username={offlinePeople[userId].username} 
                        selected={selectedUserId === userId}
                        onClick={() => setSelectedUserId(userId)}/>
                ))}
            </div>

            <div className="flex flex-col bg-blue-50 w-2/3 p-4 overflow-hidden">
                <div className="flex-grow overflow-y-auto overflow-x-hidden">
                    {!selectedUserId && (
                        <div className="flex items-center justify-center h-full text-2xl text-gray-500 font-light">
                            Select a user to chat
                        </div>
                    )}
                    {!!selectedUserId && (
                        <div className="space-y-4">
                            {messagesWithoutDupes.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === id ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm text-sm ${
                                            message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {!!selectedUserId && (
                    <form className="flex gap-3 mt-3" onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={newMessageText}
                            onChange={(ev) => setNewMessageText(ev.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12a59.768 59.768 0 01-18.216 8.875L6 12Zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Chat;