import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
};

const ChatScreen: React.FC = (navigation) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Xin chào!", sender: "other" },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };

    setMessages([newMessage, ...messages]);
    setInput("");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={{ padding: 10 }}
        />

        <View style={styles.inputText}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Nhập tin nhắn..."
          />
          <TouchableOpacity onPress={handleSend}>
            <Text style={styles.sendText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#006340",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#555",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color:'white'
  },
  inputText: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom:20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendText: {
    marginTop: 7,
    color: "green",
    fontWeight: "bold",
    alignItems: "center",
  },
  headerContainer: {
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontStyle: 'italic',
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingHorizontal: 18,
    },
});
