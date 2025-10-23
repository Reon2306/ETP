import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

export default function ChatDashboard() {
  // Example chat history
  const [chats, setChats] = useState([
    { id: 1, name: 'Math Doubts', lastMessage: 'What is integration?' },
    { id: 2, name: 'Physics Help', lastMessage: 'Explain Newton’s laws.' },
    { id: 3, name: 'AI Project', lastMessage: 'How to use GPT-4?' },
  ]);
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messages, setMessages] = useState([
    { sender: 'You', text: 'Hello!' },
    { sender: 'AI', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        {/* Chat History Sidebar */}
        <aside className="w-1/4 bg-white border-r border-gray-200 p-4">
          <h2 className="text-lg font-bold mb-4">Chat History</h2>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-indigo-50 transition ${activeChat.id === chat.id ? 'bg-indigo-100 font-semibold' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <div>{chat.name}</div>
                <div className="text-xs text-gray-500">{chat.lastMessage}</div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{activeChat.name}</h3>
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'You' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    <span className="block text-xs font-semibold mb-1">{msg.sender}</span>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="p-4 border-t bg-white flex" onSubmit={handleSend}>
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}
