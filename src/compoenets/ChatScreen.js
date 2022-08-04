import styled from "styled-components";
import MessageForm from "./MessageForm";


function ChatScreen({
 channel,
 messagesLoading,
 nickname,
 messages,
 showEmojiPicker,
 handleEmojiSelect,
 handleMessageSend,
 setShowEmojiPicker,
 message,
 handleMessageChange,
}) {

  console.log(nickname)
 return (
   <section className="chat-screen">
     <header className="chat-header">
       <h3>#{channel}</h3>
     </header>
     {/* <ChatMessages messagesLoading={messagesLoading} messages={messages} /> */}
          <Message>
            {messages.map((el)=>(
              <div className={nickname===el.user?"sended":"recieved "}>
                <div className="content">
                  <p >{el.user}</p>
                  <p>{el.body}</p>
                </div>
               
              </div>
            ))}
          </Message>
     <div>
      
     </div>
     <footer className="chat-footer">
       <MessageForm
         emojiSelect={handleEmojiSelect}
         handleMessageSend={handleMessageSend}
         setShowEmojiPicker={setShowEmojiPicker}
         showEmojiPicker={showEmojiPicker}
         message={message}
         handleMessageChange={handleMessageChange}
       />
     </footer>
   </section>
 );
}

export default ChatScreen;




const Message =styled.div`
display: flex;
flex-direction: column;
padding:0 50px;

.sended {
  display:flex;
  justify-content: flex-end;
  
  .content {
    background-color: #4f04ff21;
  }
}
.recieved {
  display:flex;
  justify-content: flex-start;
  .content {
    background-color: #9900ff20;
  }
}

`