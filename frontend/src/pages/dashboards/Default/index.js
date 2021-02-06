import React, {useState, useEffect} from "react";
import styled, { withTheme } from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { sizing, maxHeight, height } from "@material-ui/system";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../../constants";
import {
  Grid,
  TextField,
  CardHeader,
  Tooltip,
  IconButton,
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
import { green, red } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import Actions from "./Actions";

// Custom components
import Workspace from "./Workspace";
import MyTeam from "./MyTeam";

const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Default({ theme }) {
  const [items, setItems] = useState([]);
const [open, setOpen] = React.useState(false);

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
  useEffect(() => {
    displayUser();
  }, []);
  return (
    <React.Fragment>
      <Helmet title="Tableau de bord" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Tableau de bord
          </Typography>
          <Typography variant="subtitle1">
            Heureux de vous revoir, {items.first_name}!{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
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
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <TextField
            multiline
            rows={6}
            rowsMax={15}
            variant="outlined"
            label="Votre note"
            defaultValue={items.note}
            InputLabelProps={{ shrink: true }}
            placeholder="Modifier votre note"
            fullWidth
          />
          <Button fullWidth variant="contained" color="primary">
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

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <MyTeam />
        </Grid>
        <Grid item xs={12} lg={7}>
          <Workspace />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withTheme(Default);
