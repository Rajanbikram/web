import { useState, useEffect, useRef } from 'react';
import API from '../../../utils/axios';
import { CURRENT_USER } from '../../../constants/user';

const DEFAULT_CONVERSATIONS = [
  { partnerId: 2, partnerName: 'Sarah Wilson', initials: 'SW', lastMessage: "Great! Let's schedule our first session.", unreadCount: 2 },
  { partnerId: 3, partnerName: 'Mike Chen', initials: 'MC', lastMessage: 'See you tomorrow at 3 PM!', unreadCount: 0 },
  { partnerId: 4, partnerName: 'Maria Garcia', initials: 'MG', lastMessage: '¡Muy bien! Your Spanish is improving.', unreadCount: 0 },
];

const DEFAULT_MESSAGES = [
  { id: 1, senderId: 2, receiverId: 1, text: "Hi! I saw you're interested in learning Python.", createdAt: '10:30 AM' },
  { id: 2, senderId: 1, receiverId: 2, text: "Yes! I've been wanting to learn for a while now.", createdAt: '10:32 AM' },
  { id: 3, senderId: 2, receiverId: 1, text: "That's great! I'd love to help. What's your current experience level?", createdAt: '10:35 AM' },
  { id: 4, senderId: 1, receiverId: 2, text: "I'm a complete beginner, but I'm eager to learn!", createdAt: '10:38 AM' },
  { id: 5, senderId: 2, receiverId: 1, text: "Great! Let's schedule our first session.", createdAt: '10:40 AM' },
];

function Messages() {
  const [conversations, setConversations] = useState(DEFAULT_CONVERSATIONS);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [activeConv, setActiveConv] = useState(DEFAULT_CONVERSATIONS[0]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    API.get(`/messages/conversations/${CURRENT_USER.id}`)
      .then((res) => { if (res.data.length > 0) setConversations(res.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!activeConv) return;
    API.get(`/messages/${CURRENT_USER.id}/${activeConv.partnerId}`)
      .then((res) => { if (res.data.length > 0) setMessages(res.data); })
      .catch(() => {});
  }, [activeConv]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text) return;
    const newMsg = { id: Date.now(), senderId: CURRENT_USER.id, receiverId: activeConv.partnerId, text, createdAt: 'Just now' };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
    try {
      await API.post('/messages', { senderId: CURRENT_USER.id, receiverId: activeConv.partnerId, text });
    } catch (err) { console.error(err); }
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter') handleSend(); };

  const formatTime = (dateStr) => {
    if (!dateStr || dateStr === 'Just now') return dateStr || '';
    const d = new Date(dateStr);
    return isNaN(d) ? dateStr : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages-container">
      <div className="conversations-list">
        <div className="conversations-header">
          <h2>Messages</h2>
          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Search conversations..." />
          </div>
        </div>
        <div className="conversations-body">
          {conversations.map((conv, i) => {
            const initials = conv.initials || conv.partnerName?.split(' ').map((n) => n[0]).join('').slice(0, 2);
            return (
              <div
                key={conv.partnerId || i}
                className={`conversation-item ${activeConv?.partnerId === conv.partnerId ? 'active' : ''}`}
                onClick={() => setActiveConv(conv)}
              >
                <div className="conversation-avatar">{initials}</div>
                <div className="conversation-info">
                  <div className="flex justify-between items-center">
                    <span className="conversation-name">{conv.partnerName}</span>
                    <span className="conversation-time">{conv.updatedAt ? new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                  </div>
                  <div className="conversation-preview">{conv.lastMessage}</div>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="conversation-unread">{conv.unreadCount}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-area">
        {activeConv && (
          <>
            <div className="chat-header">
              <div className="conversation-avatar">
                {activeConv.initials || activeConv.partnerName?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="chat-header-name">{activeConv.partnerName}</div>
                <div className="chat-header-status">Online</div>
              </div>
            </div>
            <div className="chat-messages" id="chatMessages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.senderId === CURRENT_USER.id ? 'sent' : 'received'}`}>
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">{formatTime(msg.createdAt)}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="btn btn-primary" onClick={handleSend}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Messages;