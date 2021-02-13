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
import Chat from "./Chat"
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Collapse from "@material-ui/core/Collapse";
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
  const [expanded, setExpanded] = React.useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("success");
  const handleClickOpen = (msg, severity) => {
   
    setMessage(msg);
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  const classes = useStyles();
  return (
    <Card mb={6}>
     {props.progress}
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
            
            <Button onClick={props.linkDone} size="small" color="secondary">
              <Link>Marquer comme fait</Link>
            </Button>
            <Button onClick={props.linkPinned} size="small" color="secondary">
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
            <Button onClick={props.linkDelete} size="small" color="secondary">
              <Link>supprimer</Link>
            </Button>
          </Grid>
          <CardActions align="left"></CardActions>
        </Grid>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            <Chat />
          </Typography>
        </CardContent>
      </Collapse>
     
    </Card>
  );
}


export default WorkspaceContent;
