import { useEffect, useRef, useState } from "react";
import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";
import "./chat.css";
import {
 initiateSocket,
 switchChannel,
 fetchChannels,
 fetchChannelMessages,
 sendMessage,
 subscribeToMessages,
} from "../helpers/socket";
import { v4 as uuidv4 } from "uuid";
import "emoji-mart";

import ChatScreen from "./ChatScreen";
import Channels from "./Chanels";

function Chat({ nickname }) {
 const [message, setMessage] = useState("");
 const [channel, setChannel] = useState("general");
 const [channels, setChannels] = useState([]);
 const [messages, setMessages] = useState([]);
 const [messagesLoading, setMessagesLoading] = useState(true);
 const [channelsLoading, setChannelsLoading] = useState(true);
 const [showEmojiPicker, setShowEmojiPicker] = useState(false);

 const prevChannelRef = useRef();
 useEffect(() => {
   prevChannelRef.current = channel;
 });
 const prevChannel = prevChannelRef.current;

 useEffect(() => {
   if (prevChannel && channel) {
     switchChannel(prevChannel, channel);
     setChannel(channel);
   } else if (channel) {
     initiateSocket(channel, nickname);
   }
 }, [channel]);

 useEffect(() => {
   setMessages([]);
   setMessagesLoading(true);

   fetchChannelMessages(channel).then((res) => {
     setMessages(res);
     setMessagesLoading(false);
   });
 }, [channel]);

 useEffect(() => {
   fetchChannels().then((res) => {
     setChannels(res);
     setChannelsLoading(false);
   });

   subscribeToMessages((err, data) => {
     setMessages((messages) => [...messages, data]);
   });
 }, []);

 const handleMessageChange = (event) => {
   setMessage(event.target.value);
 };

 const handleMessageSend = (e) => {
   if (!message) return;

   e.preventDefault();
   const data = {
     id: uuidv4(),
     channel,
     user: nickname,
     body: message,
    //  time: Date.now(),
   };
   setMessages((messages) => [...messages, data]);
   sendMessage(data);
   setMessage("");
 };

 const handleEmojiSelect = (emoji) => {
   const newText = `${message}${emoji.native}`;

   setMessage(newText);
   setShowEmojiPicker(false);
 };

 return (
   <div className="chat-container">
     <Channels
       nickname={nickname}
       channelsLoading={channelsLoading}
       channels={channels}
       channel={channel}
       setChannel={setChannel}
     />
     <ChatScreen
       channel={channel}
       nickname={nickname}
       messagesLoading={messagesLoading}
       messages={messages}
       showEmojiPicker={showEmojiPicker}
       handleEmojiSelect={handleEmojiSelect}
       handleMessageSend={handleMessageSend}
       setShowEmojiPicker={setShowEmojiPicker}
       message={message}
       handleMessageChange={handleMessageChange}
     />
   </div>
 );
 }

export default Chat