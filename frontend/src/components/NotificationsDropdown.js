/**
 * Will be shown on the top the app, used for notifications from users and front desk ...
 */

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FRONTDESK_API, TOKEN, TIMEOUT_VALUE } from "../constants";
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
  SvgIcon,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Bell, Home, Mail, AlertTriangle, Flag, UserPlus, Server, AtSign, MessageCircle, X } from "react-feather";
import axios from "axios";

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

const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;


function Notification({ title, description, Icon, deleteAction, notificationId }, props) {
  
  async function deleteNotification() {
    const reponse = await axios({
      method: "delete",
      url: `${FRONTDESK_API}/notification/delete/${deleteAction}/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
      
    }).then(displayNotification());
  }

  return (
    <ListItem divider component={Link} to="#">
      <ListItemAvatar>
        <Avatar>
          <SvgIcon fontSize="small">{Icon}</SvgIcon>
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "subtitle2",
          color: "textPrimary",
        }}
        secondary={description}
      />
      <Typography variant="caption">
        <X size={16} onClick={deleteNotification} />
      </Typography>

    </ListItem>
  );
}


function NotificationsDropdown() {
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

  async function deleteNotification1() {
    const reponse = await axios({
      method: "delete",
      url: `${FRONTDESK_API}/notification/delete/${364}/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    }).then(displayNotification());
  }



  useEffect(() => {
    displayNotification();
  }, []);

  

const categories = ["message", "system", "tag" , "pinned"]
  const notificationCard = items.map((msg) => {
     if (msg.category != "message")
      return <Notification
         title={msg.title}
         key={msg.id}
         deleteAction={msg.id}
         description={msg.content}
         notificationId={deleteNotification1}
         Icon={
           msg.category == "tag" ? (
             <AtSign />
           ) : msg.category == "message" ? (
             <Mail />
           ) : msg.category == "system" ? (
             <AlertTriangle />
           ) : msg.category == "pinned" ? (
             <Flag />
           ) : (
             <Bell />
           )
         }
       />;
  });





  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <Indicator badgeContent={items.length}>
            <Bell />
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
        <NotificationHeader p={2}>
          <Typography variant="subtitle1" color="textPrimary">
            {items.length} nouvelles notifications
          
          </Typography>
        </NotificationHeader>
        <React.Fragment>
          <List disablePadding>{notificationCard}
          </List>
          <Box p={1} display="flex" justifyContent="center">
            <Button size="small" component={Link} to="#">
              Supprimer toutes les notifications
               
            </Button>
          </Box>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default NotificationsDropdown;
