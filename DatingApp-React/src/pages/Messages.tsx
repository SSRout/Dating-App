import { useState } from "react";
import { MessageSquare, Send, FileText } from "lucide-react";

interface Message {
  id: number;
  senderId: number;
  senderUsername: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export default function Messages() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      senderUsername: "Sarah",
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
    {
      id: 2,
      senderId: 2,
      senderUsername: "Emily",
      content: "I love your profile! Would love to chat sometime.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      isRead: false,
    },
    {
      id: 3,
      senderId: 3,
      senderUsername: "Jessica",
      content: "Let's grab coffee this weekend?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: false,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(
    messages[0],
  );
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="max-w-6xl mx-auto px-4 h-96 md:h-screen flex gap-6">
        {/* Messages List */}
        <div className="w-full md:w-72 bg-dark-card border border-dark-border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-dark-border">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neon-pink" />
              Messages
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full text-left p-4 border-b border-dark-border hover:bg-dark-bg transition-colors ${
                  selectedMessage?.id === msg.id
                    ? "bg-dark-bg border-l-2 border-l-neon-pink"
                    : ""
                } ${!msg.isRead ? "font-bold" : ""}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-white">
                    {msg.senderUsername}
                  </p>
                  <span
                    className={`text-xs ${msg.isRead ? "text-gray-500" : "text-neon-pink"}`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">{msg.content}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedMessage ? (
          <div className="hidden md:flex flex-1 bg-dark-card border border-dark-border rounded-lg flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">
                {selectedMessage.senderUsername}
              </h3>
              <span className="text-sm text-gray-500">
                {formatTime(selectedMessage.timestamp)}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 bg-dark-bg border border-dark-border rounded-lg">
                  <p className="text-white">{selectedMessage.content}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-xs px-4 py-2 bg-gradient-primary rounded-lg">
                  <p className="text-white">
                    Thanks for the message! Let's chat soon.
                  </p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-dark-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendReply()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:outline-none focus:border-neon-cyan"
                />
                <button
                  onClick={handleSendReply}
                  className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-neon-pink transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 bg-dark-card border border-dark-border rounded-lg items-center justify-center flex-col gap-4">
            <FileText className="w-16 h-16 text-gray-600" />
            <p className="text-gray-500">Select a message to start chatting</p>
          </div>
        )}
      </div>

      {/* Mobile Info */}
      <div className="md:hidden max-w-6xl mx-auto px-4 mt-8 text-center text-gray-400">
        {selectedMessage && (
          <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <p className="text-lg font-bold text-white mb-4">
              {selectedMessage.senderUsername}
            </p>
            <p className="text-gray-300 mb-6">{selectedMessage.content}</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Reply..."
                className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:outline-none focus:border-neon-cyan"
              />
              <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
