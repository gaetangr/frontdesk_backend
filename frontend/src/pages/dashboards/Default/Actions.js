import { FRONTDESK_API, TOKEN, FRONTDESK_URL } from "../../../constants";
import React, {useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import styled from "styled-components/macro";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiAlert from "@material-ui/lab/Alert";
import { Button as MuiButton, Menu, MenuItem, Snackbar} from "@material-ui/core";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
  PersonAdd,
  Lock,
  Message

} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;
  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserCreate() {

  const schema = yup.object().shape({
  })

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, errors, control, reset } = methods;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("success");
  const [openInfo, setOpenInfo] = React.useState(false);

  
   const onSubmit = (data) => {
     axios({
       method: "post",
       url: `${FRONTDESK_API}/users/`,
       data: {
         username: data.username,
         email: `${data.username}k@example.com`,
         password: "passwordpassword",
       },
     })
       .then()
       .catch((error) => {
         if (error.response) {
         
         } else {
       
         }
       });
   };

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
     setOpenInfo(false);
  };

http: return (
  <React.Fragment>
    <SmallButton size="small" mr={2}>
      <Button
        size="small"
        href={`${FRONTDESK_URL}/admin-manager/`}
        variant="contained"
        color="primary"
        mt={3}
      >
        <Lock style={{ marginRight: 3 }} />
        {"   "}
        {"   "} Espace manager
      </Button>
    </SmallButton>
    <SmallButton size="small" mr={2}>
      <Button
        size="small"
        href={`${FRONTDESK_URL}/admin-manager/notification/notification/add/`}
        variant="outlined"
        color="secondary"
        mt={3}
      >
        <Message style={{ marginRight: 3 }} />
        {"   "}
        {"   "} Envoyer un message
      </Button>
    </SmallButton>
    <SmallButton size="small" mr={2}>
      <Button
        size="small"
        href={`${FRONTDESK_URL}/admin-manager/users/user/add/`}
        variant="outlined"
        color="secondary"
        mt={3}
      >
        <PersonAdd style={{ marginRight: 3 }} />
        {"   "}
        {"   "} Ajouter un utilisateur
      </Button>
    </SmallButton>
  </React.Fragment>
);
}


function Actions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

  return (
    <React.Fragment>

      <UserCreate/>
  
    </React.Fragment>
  );
}

export default Actions;
