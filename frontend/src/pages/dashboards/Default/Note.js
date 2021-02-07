import React, { useState, useEffect } from "react";
import styled, { withTheme } from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { sizing, maxHeight, height } from "@material-ui/system";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../../constants";
import {
  Grid,
  TextField,
  Divider,
  CardHeader,
  Tooltip,
  Typography,
    IconButton,
  LinearProgress,
  Button,
  Card as MuiCard,
  Paper,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { Edit, HelpCircle } from "react-feather";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useForm, Controller } from "react-hook-form";
import { green, red } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";
const Card = styled(MuiCard)(spacing);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Note(props) {
  const [items, setItems] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function displayUser() {
    axios({
      method: "get",
      url: `${FRONTDESK_API}/users/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    }).then((res) => {
      setItems(res.data[0]);
    });
  }

  const methods = useForm();
  const { register, handleSubmit, control, reset } = methods;
  const onSubmit = (data) => {
    console.log(data.TextField);
      axios({
          method: "patch",
          url: `${FRONTDESK_API}/profile/${items.id}/`,
          data: {
              note: data.note,
          },
          headers: {
              Authorization: `Token ${TOKEN}`,
          },
      })
          .then(
              // Add linear progress
              setLoading(<LinearProgress />),
              // set timeout
              setTimeout(() => {
                  setLoading("");
                  displayUser();
              }, 3332),
              
      ).catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data.detail);

          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  useEffect(() => {
    displayUser();
  }, []);

    return (
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <Card mb={7}>
            <CardHeader
              action={
                <Tooltip title="Vous pouvez ajouter des notes, vous êtes la seule personne à y avoir accès">
                  <IconButton aria-label="settings">
                    <HelpCircle />
                  </IconButton>
                </Tooltip>
              }
              title="Mes notes"
            />

            <Grid container justify="flex-end"></Grid>

            <Paper component="blockquote">
              {" "}
              <ReactMarkdown source={items.note} />{" "}
            </Paper>
                    
                    {loading}
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Option 1: pass a component to the Controller. */}
            <Controller
              as={
                <TextField
                  multiline
                  rows={10}
                  rowsMax={15}
                  variant="outlined"
                  label="Votre note"
                  defaultValue={items.note}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Modifier votre note"
                  fullWidth
                />
              }
              rules={{ required: true, minLength: 0 }}
              name="note"
              control={control}
            />
          </form>

          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Modifier
          </Button>
          <Typography onClick={handleClickOpen} variant="caption">
            Formater votre texte
          </Typography>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Formater ses notes"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Vous pouvez utiliser les balises suivantes pour formater votre
                texte:
                <ul>
                  <li># Titre de niveau 1</li>
                  <li>## Titre de niveau 2</li>
                  <li>**Je suis en gras**</li>
                  <li>_Je suis en italique_</li>
                  <li>- Je suis une liste </li>
                  <li>[Je suis un lien](https://example.com/)</li>
                </ul>
                <Divider mt={3} />
                <Typography variant="caption">
                  <ReactMarkdown source={"# Titre de niveau 1"} />
                  <ReactMarkdown source={"## Titre de niveau 2"} />
                  <ReactMarkdown source={"**Je suis en gras**"} />
                  <ReactMarkdown source={"_Je suis en italique_"} />
                  <ReactMarkdown source={"- Je suis une liste "} />
                  <ReactMarkdown
                    source={"[Je suis un lien](https://example.com/)."}
                  />
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                J'ai compris
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
}

export default Note;
