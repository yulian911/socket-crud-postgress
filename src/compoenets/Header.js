import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {IoMdNotifications} from 'react-icons/io'
import { initiateSocket, subscribeToNotification } from '../helpers/socket'
const Header = ({nickname}) => {
  const [notification, setNotification] = useState([]);

  // useEffect(() => {
   
  //   initiateSocket(1, nickname);
  // }, [])
  
  useEffect(() => {

 
    subscribeToNotification((err, data) => {
      setNotification((notification) => [...notification, data]);
    });
  }, []);
  

  return (
    <HeaderComponent>
        <div style={{padding:0}}>
          <Link to='/'>
            Logo
          </Link>
        </div>
        <NavBar>
          <ul>
            <li>
              <Link to='/'>
                  Home
              </Link>
            </li>
            <li>
              <Link to='/chat'>
                  Chat
              </Link>
            </li>
            <li>
              <Link to='/noti'>
                  Noti
              </Link>
            </li>
          </ul>
        </NavBar>
        <Notification>
          <div>
            <IoMdNotifications color='white'/>
            <span style={{color: 'white'}}>{notification.length}</span>
          </div>
        </Notification>
    </HeaderComponent>
  )
}

export default Header


const HeaderComponent =styled.header`
width: 80%;

margin:0 auto;
padding:0;
display: flex;
justify-content: space-around;
align-items: center;


`
const NavBar =styled.div`
  display: flex;
  /* height:50px; */
  padding-top:25px ;
  flex-basis: 50%;
  background-color: red;
  justify-content: center;
  align-items: center;
    ul{
      display: flex;
   
      list-style: none;
      gap:10px;
      li{
        background-color: blue;
        a{
          text-decoration: none;
        }
      }
      
    }


`
const Notification = styled.div`
width: 50%;
height: 85px;
display: flex;
justify-content: center;
align-items: center;
background: blue;

`