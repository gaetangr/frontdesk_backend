/**
 * Display the workspace and notebooks for collaborators
 * The form logic and all components related to the workspace
 * should be contain in this file
 */
import { FRONTDESK_API, TOKEN } from "../../constants/";
import React, { isValidElement, useEffect, useState } from "react";
import styled from "styled-components/macro";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
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
import { spacing, width } from "@material-ui/system";
import axios from "axios";

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
        handleClickOpen("La consigne est indiquée comme fait");
        console.log(reponse.data);
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
        <Box display="flex">
          <Grid container justify="flex-start">
            <Grid item>{props.category}</Grid>
          </Grid>

          {/* Actions - Actions if user == request.user such as edit or delete */}
          <Grid container justify="flex-end">
            <Grid item xl="auto">
              {" "}
              {props.status}
              {props.pinned}
            </Grid>
            <CardActions align="right"></CardActions>
          </Grid>
        </Box>
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
              <Link>Editer</Link>
            </Button>
            <Button onClick={handleDelete} size="small" color="secondary">
              <Link href={props.deleteLink}>supprimer</Link>
            </Button>
          </Grid>
          <CardActions align="right"></CardActions>
        </Grid>
      </Box>
    </Card>
  );
}


export default WorkspaceContent;
