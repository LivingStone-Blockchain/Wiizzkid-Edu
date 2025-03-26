import React from "react";

const WebsiteWithChat: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  const handleSendMessage = (message: string) => {
    // In a real app, you would handle the message here
    // and return a response
    return `Thank you for your message: "${message}". How can I help you further?`;
  };
  
  return (
    <div className="relative min-h-screen">
      {/* Your website content would go here */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <p></p>
      </div>
      
      {/* Chat component */}
      <ChatBot 
        onSendMessage={handleSendMessage}
        botName="Milton"
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
};

export default WebsiteWithChat;