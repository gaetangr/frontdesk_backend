/**
 * Display the workspace and notebooks for collaborators
 * The form logic and all components related to the workspace
 * should be contain in this file
 */
import { FRONTDESK_API, TOKEN } from "../../constants/";
import React, { isValidElement, useEffect, useState } from "react";
import styled from "styled-components/macro";
import Countdown from "react-countdown";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useIdleTimer } from "react-idle-timer";
import Helmet from "react-helmet";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Loop,
  Group,
  Build,
  SingleBed,
  GroupWork,
  RoomService,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import {
  deepOrange,
  deepPurple,
  indigo,
  blue,
  green,
  orange,
} from "@material-ui/core/colors";
import {
  CardContent,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
  Button,
  Grid,
  Paper,
  Tooltip,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import axios from "axios";

// Custom functions
//------------------------------
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Returns the first letter of the username.
 *
 * @param {string} string The string to be parsed.
 */
function FirstLetter(string) {
  return string.slice(0, 2);
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Custom constants
//------------------------------
const DoneChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 12px;
  height: 18px;
  float: right;
  margin-left: 2px;
  margin-top: 3px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)}px;
    padding-right: ${(props) => props.theme.spacing(1.375)}px;
  }
`;

const PinnedChip = styled(Chip)`
  background-color: ${orange[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 12px;
  height: 18px;
  float: right;
  margin-left: 2px;
  margin-top: 3px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)}px;
    padding-right: ${(props) => props.theme.spacing(1.375)}px;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

// Components
//------------------------------

/**
 * Return a workspace content with props
 */
function WorkspaceContent(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("success");
  const handleClickOpen = (msg, severity) => {
    console.log(msg);
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleAction(method, message, data) {
    axios({
      method: method,
      url: `${FRONTDESK_API}/notebook/${props.notebookId}/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
      data,
    })
      .then(handleClickOpen(message))
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data.detail);
          handleClickOpen(error.response.data.detail);
          setError("error");
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  /**
   * Delete an instance of a notebook
   */
  function handleDelete() {
    handleAction("delete", "Consigne supprimée");
  }

  /**
   * mark a notebook as done
   */
  function handleDone() {
    axios({
      method: "patch",
      url: `${FRONTDESK_API}/notebook/${props.notebookId}/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
      data: { is_done: true },
    })
      .then((reponse) => {
        handleClickOpen("La consigne est indiquée comme fait")
        console.log(reponse.data)
      }) 
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data.detail);
          handleClickOpen(error.response.data.detail);
          setError("error");
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function handlePinned() {
    axios({
      method: "patch",
      url: `${FRONTDESK_API}/notebook/${props.notebookId}/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
      data: { is_pinned: true },
    })
      .then(handleClickOpen("La consigne a été épinglée"))
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data.detail);
          handleClickOpen(error.response.data.detail);
          setError("error");
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const classes = useStyles();
  return (
    <Card mb={6}>
      <CardContent>
        <Grid>
          {props.status} {props.pinned}
        </Grid>
        {/* Header - Author info, date, status */}
        <CardHeader
          avatar={
            <Avatar className={classes.purple}>
              {FirstLetter(props.name)}
            </Avatar>
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={`${props.name} - ${props.title}`}
          subheader={props.created}
        />

        <Divider mb={3} />

        {/* Content - Message content */}
        <Typography gutterBottom>{props.message}</Typography>
      </CardContent>

      {/* Actions - Actions for the user such as add comment, mark as done etc */}
      <Box mt={4} ml={4} mb={3} display="flex">
        <Grid container justify="flex-start">
          <Grid item>
            {" "}
            <Button size="small" color="primary">
              <Link href={props.answerLink}>Répondre </Link>
            </Button>
            <Button onClick={handleDone} size="small" color="secondary">
              <Link href={props.doneLink}>Marquer comme fait</Link>
            </Button>
            <Button onClick={handlePinned} size="small" color="secondary">
              Epingler
            </Button>
          </Grid>
        </Grid>

        {/* Actions - Actions if user == request.user such as edit or delete */}
        <Grid container justify="flex-end">
          <Grid item xl="auto">
            {" "}
            <Button onClick={props.edit} size="small" color="primary">
              <Link href={props.editLink}>Editer</Link>
            </Button>
            <Button onClick={handleDelete} size="small" color="secondary">
              <Link href={props.deleteLink}>supprimer</Link>
            </Button>
          </Grid>
          <CardActions align="right"></CardActions>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={error}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Card>
  );
}

function Workspace() {


const [items, setItems] = useState([]);
const [error, setError] = useState();
const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    
     setOpen(true);
    
  };

  const handleEdit = () => {
    setOpen(false);
  };


  const displayNotebook = async () => {
    const reponse = await axios({
      method: "get",
      url: `${FRONTDESK_API}/notebook/list/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    });
    setItems(reponse.data);
  };

  const [progress, setProgress] = React.useState("");
const [loading, setLoading] = useState("");
  const [value, setValue] = React.useState("");

  useEffect(() => {
    displayNotebook();
    console.log("Loading state");
  }, []);


const schema = yup.object().shape({
  TextField: yup
    .string()
    .required("Vous n'avez rien renseigné")
    .min(10, "Trop court ").max(1000),
});

  const methods = useForm({
    resolver: yupResolver(schema),
  });

    const {register, handleSubmit, errors, control, reset } = methods;
  const onSubmit = (data) => {
    console.log(data.TextField)
    axios({
  
    method: "post",
    url: `${FRONTDESK_API}/notebook/create/`,
    data: {
      id: 35,
      workspace: 1,
      author: 1,
      content: data.TextField,
      is_done: false,
      is_pinned: false,
    },
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  })
    .then(
      

      setLoading(<LinearProgress variant="query" />),
              // set timeout
              setTimeout(() => {
                  setLoading("");
                  displayNotebook();
              }, 2500),
   
   
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
    });};
  
  
  
  
  const workspaceCard = items.map((msg) => (

    <WorkspaceContent
      name={capitalizeFirstLetter(msg.username)}
      title={msg.username_title}
      key={msg.id}
      status={msg.is_done == true ? <DoneChip label="Fait" /> : ""}
      pinned={msg.is_pinned == true ? <PinnedChip label="Important" /> : ""}
      message={msg.content}
      notebookId={msg.id}
      created={msg.created.slice(0, 10)}
      edit={handleClickOpen}
      
    />
  ));

  return (
    <React.Fragment>
      <Helmet title="Espace de travail" />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Modifier la consigne</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Option 1: pass a component to the Controller. */}
            <Controller
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  id="consigne"
                  label="Consigne"
                  rows={5}
                  multiline
                  fullWidth
                />
              }
              name="Note"
              control={control}
              defaultValue=""
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button  color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h3" gutterBottom display="inline">
        <Grid container spacing={6}>
          <Grid item xs={8}>
            Cahier de consignes
          </Grid>
          <Grid item>
            <Button>
              <Loop onClick={displayNotebook} />
            </Button>
          </Grid>
        </Grid>
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={9}>
          {loading}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Option 1: pass a component to the Controller. */}
            <Controller
              as={
                <TextField
                  multiline
                  onSubmit
                  rows={4}
                  autoFocus="true"
                  value=""
                  error={errors.TextField ? true : false}
                  helperText={errors.TextField?.message}
                  variant="outlined"
                  label="Votre consigne"
                  placeholder="Ajouter votre consigne"
                  fullWidth
                />
              }
              name="TextField"
              control={control}
              defaultValue=""
            />
          </form>

          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Ajouter la consigne
            {value}
          </Button>
          {progress}
          <Divider my={6} />
          {workspaceCard}
          {error ? (
            <Alert mt={3} mb={1} severity="error">
              {error}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Workspace;
