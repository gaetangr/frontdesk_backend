import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FRONTDESK_API, TOKEN, TIMEOUT_VALUE } from "../constants";
import axios from "axios";
import {
  Avatar as MuiAvatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover as MuiPopover,
    Tooltip,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import {
  Bell,
  Home,
    Mail,
  MessageSquare,
  AlertTriangle,
  Flag,
  UserPlus,
  Server,
  AtSign,
  MessageCircle,
  X,
} from "react-feather";

const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    ${(props) => props.theme.shadows[1]};
    border: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const MessageHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;



function MessagesDropdown() {
    const ref = useRef(null);
      const [items, setItems] = useState([]);

      async function displayNotification() {
        const reponse = await axios({
          method: "get",
          url: `${FRONTDESK_API}/notification/`,
          headers: {
            Authorization: `Token ${TOKEN}`,
          },
        });
          setItems(reponse.data);
        
      }
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
      useEffect(() => {
        displayNotification();
      }, []);

  

    const messageCard = items.map((msg) => {
        if (msg.category == "message")
       return (
         <List disablePadding>
           <ListItem divider component="" to="#">
             <ListItemAvatar>
               <Avatar src={""} alt="Avatar">
                 <SvgIcon fontSize="small"><Mail/></SvgIcon>
               </Avatar>
             </ListItemAvatar>
             <ListItemText
               primary={msg.title}
               primaryTypographyProps={{
                 variant: "subtitle2",
                 color: "textPrimary",
               }}
               secondary={msg.content}
             />
           </ListItem>
         </List>
       );
    });


  return (
    <React.Fragment>
      <Tooltip title="Messages">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <Indicator badgeContent={items.length}>
            <MessageSquare />
          </Indicator>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <MessageHeader p={2}>
          <Typography variant="subtitle1" color="textPrimary">
            {items.length} Nouveaux messages
          </Typography>
        </MessageHeader>
        <React.Fragment>
          {messageCard}
          <Box p={1} display="flex" justifyContent="center">
            {" "}
            <Button size="small" component={Link} to="#">
              Supprimer toutes les notifications
            </Button>
          </Box>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default MessagesDropdown;
