import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  
  const handleClick = () => {
    setOpen(true);
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/v1/property/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token cf404b0174899469b4fbfc713719e462fb8a2fd3",
    },
  }).then(res => { 
setMessage(res.data[0].name);

  })

  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={handleClick}>
        Créer un utilisateur
      </Button>
      {message}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message="I love snacks"
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Utilisateur enregistré
        </Alert>
      </Snackbar>
    </div>
  );
}
