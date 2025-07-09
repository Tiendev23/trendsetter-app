import React, { createContext, useContext, useState, ReactNode } from "react";

type Message = {
  id: string;
  title: string;
  img: any;
  nd: string;
  time: string;
  read: boolean;
  history: {
    text: string;
    sender: "me" | "other";
  }[];
};

type MessageContextType = {
  messages: Message[];
  sendMessage: (id: string, text: string) => void;
  markAsRead: (id: string) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      title: "Admin",
      img: require("../../assets/images/logo.jpg"),
      nd: "Chào bạn, đây là tin nhắn chưa đọc. Hãy kiểm tra ngay!",
      time: "10:45 AM",
      read: false,
      history: [
        { text: "Chào bạn, đây là tin nhắn chưa đọc.", sender: "other" },
      ],
    },
  ]);

  const sendMessage = (id: string, text: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              read: true,
              nd: text,
              time: new Date().toLocaleTimeString(),
              history: [{ text, sender: "me" }, ...msg.history],
            }
          : msg
      )
    );
  };

  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage, markAsRead }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
