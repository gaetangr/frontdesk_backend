import React, { useState, useEffect } from "react";
import styled, { withTheme } from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { sizing, maxHeight, height } from "@material-ui/system";
import { Helmet } from "react-helmet";
import Stats from "./Stats";
import { FRONTDESK_API, TOKEN } from "../../../constants";
import {
  Grid,
  TextField,
  Divider,
  CardHeader,
  Tooltip,
  Typography,
  IconButton,
  CardMedia,
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
import { makeStyles } from "@material-ui/core/styles";

import { spacing } from "@material-ui/system";
const Card = styled(MuiCard)(spacing);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Note(props) {
  const [items, setItems] = useState([]);
  const [itemsProperty, setItemsProperty] = useState([]);
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

    function displayProperty() {
      axios({
        method: "get",
        url: `${FRONTDESK_API}/property/`,
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      }).then((res) => {
        setItemsProperty(res.data[0]);
      });
    }

  const methods = useForm();
  const { register, handleSubmit, control, reset } = methods;
  const onSubmit = (data) => {
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
        setOpen(false),
        // set timeout
        setTimeout(() => {
          setLoading("");
          displayUser();
        }, 3332)
      )
      .catch((error) => {
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
    displayProperty()
  }, []);
 const classes = useStyles();
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
          <Button
            onClick={handleClickOpen}
            //onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Modifier
          </Button>
          {loading}
        </Card>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={12} md={6}>
            <Stats
              tooltipInfo="Ordre du jour ajouté par un administrateur de votre établissement"
              title="Ordre du jour"
              amount={itemsProperty.notice}
              since="Depuis le mois dernier"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stats
              tooltipInfo="Une check-list ajoutée par un administrateur de votre établissement"
              title="Check-list"
              download={
                <Button
                  href={itemsProperty.checklist}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  Télécharger
                </Button>
              }
              see={
                <Button
                  href={itemsProperty.checklist}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  Voir
                </Button>
              }
              since="Depuis l'année dernière"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stats
              tooltipInfo="Le planning ajouté par un administrateur de votre établissement"
              title="Planning"
              download={
                <Button
                  href={itemsProperty.planning}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  Télécharger
                </Button>
              }
              see={
                <Button
                  href={itemsProperty.planning}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  Voir
                </Button>
              }
              since="Depuis l'année dernière"
            />
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Modifier votre note personnelle
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous pouvez formatter votre note
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Option 1: pass a component to the Controller. */}
            <Controller
              as={
                <TextField
                  multiline
                  rows={10}
                  autoFocus={true}
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
              defaultValue={items.note}
              control={control}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Modifier la note
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Note;
