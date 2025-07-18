import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useMessages } from "../../contexts/ChatDataContext";

export default function ChatScreen({ route }) {
  const { id } = route.params || {};
  const { messages, sendMessage, markAsRead } = useMessages();
  const conversation = messages.find((m) => m.id === id);
  const [input, setInput] = useState("");
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(id, input);
    setInput("");
  };

  useEffect(() => {
    markAsRead(id);
  }, []);

  return (
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <FlatList
            data={conversation?.history || []}
            inverted
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.sender === "me" ? styles.myMessage : styles.otherMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={{ padding: 10 }}
          />

          <View style={[styles.inputText, { paddingBottom: insets.bottom }]}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Nhập tin nhắn..."
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSend}>
              <Text style={styles.sendText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    color: "white",
  },
  inputText: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
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
});
