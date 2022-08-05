import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { fetchChannelNotification, initiateSocket, sendNotification, subscribeToNotification } from '../helpers/socket';
import { v4 as uuidv4 } from "uuid";
const Notification = ({nickname}) => {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("powiadomienia");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState([]);

  // const prevChannelRef = useRef();

  // useEffect(() => {
  //   prevChannelRef.current = channel;
  // });

  // const prevChannel = prevChannelRef.current;


  useEffect(() => {
    // if (prevChannel && channel) {
    //   switchChannel(prevChannel, channel);
    //   setChannel(channel);
    // } else if (channel) {
      initiateSocket(channel, nickname);
    // }
  }, []);
  useEffect(() => {

 
    subscribeToNotification((err, data) => {
      
      setNotification((notification) => [...notification, data]);
    });
    fetchChannelNotification(channel).then((res) => {
      setNotification(res);
      // setMessagesLoading(false);
    });
  }, []);

 
  const handleNotiSend = () => {
    if (!message) return;
 
    const data = {
      id: uuidv4(),
      channel,
      from: nickname,
      type: message,
     //  time: Date.now(),
    };
    // console.log('XD')
    // setNotification((notification) => [...notification, data]);
    sendNotification(data);
    setMessage("");
 
  };

  return (
    <Container>
      <Sender>
          
           <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
           <button onClick={handleNotiSend }>Wyslij</button>
      </Sender>
      <NotiPanel>
          {notification.filter(el=>el.from !==nickname).map(el=>(
            <div>
              <p>ID:{el.id}</p>
              <p>{el.type}</p>
            </div>
          ))}
      </NotiPanel>
    </Container>
  )
}

export default Notification

const Container=styled.div`
/* background-color: red; */
width: 100%;
min-height: 699px;
display: flex;


`
const Sender=styled.div`
/* background-color: yellow; */
display: flex;
flex-basis: 20%;
flex-direction: column;
padding: 50px 30px;

`
const NotiPanel=styled.div`
background-color: green;

flex-basis: 80%;  

`