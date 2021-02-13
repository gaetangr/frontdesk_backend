
import { FRONTDESK_API, TOKEN } from "../../constants/";
import React, { isValidElement, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import {
  Badge,
  Box,
  Grid,
  Card,
  TextField as MuiTextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Link,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import SendIcon from "@material-ui/icons/Send";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Divider = styled(MuiDivider)(spacing);

const TextField = styled(MuiTextField)(spacing);

const ChatContainer = styled(Grid)`
  width: 120%;
  height: 100%;
`;

const ChatSidebar = styled(Grid)`
  border-right: 1px solid ${(props) => props.theme.palette.divider};
`;

const ChatMain = styled(Grid)``;

const ChatMessages = styled.div`
  overflow-y: scroll;
  height: calc(65vh - 94px);
`;

const ChatMessage = styled.div`
  margin: 30px;
  text-align: ${(props) => props.position};
`;

const ChatMessageInner = styled.div`
  display: inline-block;
`;

const ChatMessageTime = styled(Typography)`
  text-align: right;
  opacity: 0.8;
`;

const ChatMessageAvatar = styled(Avatar)`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
`;

const ChatMessageBubble = styled.div`
  display: inline-block;
  margin-right: auto;
  background: ${(props) =>
    props.highlighted
      ? props.theme.palette.secondary.main
      : props.theme.palette.action.hover};
  color: ${(props) =>
    props.highlighted
      ? props.theme.palette.common.white
      : props.theme.palette.text.primary};
  border-radius: 3px;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-bottom: ${(props) => props.theme.spacing(1)}px;
  ${(props) => props.theme.shadows[1]};
`;

const ChatMessageBubbleName = styled(Typography)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const ChatInput = styled(Grid)`
  min-height: 94px;
  padding: ${(props) => props.theme.spacing(5)}px;
`;

const Online = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)}px;
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

function ChatMessageComponent({
  name,
  message,
  time,
  avatar,
  position = "left",
}) {
  return (
    <ChatMessage position={position}>
      <ChatMessageInner>
       
        <ChatMessageBubble highlighted={position === "right"}>
          <Box>
            <ChatMessageBubbleName variant="body1">
              {name}
            </ChatMessageBubbleName>
          </Box>
          <Typography variant="body2">{message}</Typography>
        </ChatMessageBubble>
        <ChatMessageTime variant="body2">{time}</ChatMessageTime>
      </ChatMessageInner>
    </ChatMessage>
  );
}

function ChatWindow() {

  const [comments, setComments] = useState([])
  const [comments1, setComments1] = useState([]);
  const displayComments = async () => {
    const reponse = await axios({
      method: "get",
      url: `${FRONTDESK_API}/comment/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    });
    setComments(reponse.data);
  }; 

  useEffect(() => {
    
    displayComments()
 
  }, []);

useEffect(() => {

  setComments1(comments);
}, [comments]);


  
  const commentCard = comments1.map((msg) => (<li>{msg.content}</li>))
  return (
    <ChatContainer container component={Card}>
     {commentCard}
    </ChatContainer>
  );
}

function Chat() {
  return (
    <React.Fragment>
  
     

      <Divider my={6} />

      <ChatWindow />
    </React.Fragment>
  );
}

export default Chat;
