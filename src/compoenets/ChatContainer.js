import React, { useState } from 'react'
import Chat from './Chat';
import LoginDialog from './LoginDialog';

const ChatContainer = ({nickname}) => {
  // const [nickname, setNickname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);


  // const handleNicknameChange = (event) => {
  //   setNickname(event.target.value.trim());
  // };
 
  // const handleNicknameSubmit = (e) => {
  //   if (!nickname.length) return;
 
  //   e.preventDefault();
 
  //   setLoggedIn(true);
  // };
  return (
    <div className="main-div">
     {/* {!loggedIn ? (
       <LoginDialog
         nicknameChange={handleNicknameChange}
         nicknameSubmit={handleNicknameSubmit}
       />
     ) : 
     ( */}
       <Chat nickname={nickname} />
     {/* )} */}
   </div>
  )
}

export default ChatContainer