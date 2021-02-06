/**
 * Display the workspace and notebooks for collaborators
 * The form logic and all components related to the workspace
 * should be contain in this file
 */
import { FRONTDESK_API, TOKEN } from "../../constants/";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Helmet from "react-helmet";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import { Loop, Group, Build, SingleBed, GroupWork, RoomService} from "@material-ui/icons";
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
  /**
   * Delete an instance of a notebook
   */
  function handleDelete() {
    axios({
      method: "delete",
      url: `${FRONTDESK_API}/notebook/${props.notebookId}/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    });
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
          subheader="14 janvier, 2020"
        />

        <Divider mb={3} />

        {/* Content - Message content */}
        <Typography gutterBottom>{props.message}</Typography>
      </CardContent>

      {/* Actions - Actions for the user such as add comment, mark as done etc */}
      <Box display="flex">
        <Grid container justify="flex-start">
          <Grid item>
            {" "}
            <Button size="small" color="primary">
              <Link href={props.answerLink}>Répondre</Link>
            </Button>
            <Button onClick={handleDone} size="small" color="secondary">
              <Link href={props.doneLink}>Marquer comme fait</Link>
            </Button>
            <Button size="small" color="secondary">
              Epingler
            </Button>
          </Grid>
        </Grid>

        {/* Actions - Actions if user == request.user such as edit or delete */}
        <Grid container justify="flex-end">
          <Grid item xl="auto">
            {" "}
            
            <Button size="small" color="primary">
              <Link href={props.editLink}>Editer</Link>
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

function refreshPage() {
  window.location.reload(false);
}

function Workspace() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState();
  const [count, setCount] = useState(0);

  const [term, setTerm] = useState('');
  
  const displayNotebook = async () => {
    const reponse = await axios({
      method: "get",
      url: `${FRONTDESK_API}/notebook/list/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    });
    setItems(reponse.data);
  }


 






  async function createNotebook() {
    const reponse = await axios({
      method: "post",
      url: `${FRONTDESK_API}/notebook/create/`,
      data: {
        id: 129,
        workspace: 23,
        content: "REACT",
        author: 2,
        username: "admin",
      },
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    });
  }

  const workspaceCard = items.map((msg) => (
    <WorkspaceContent
      name={capitalizeFirstLetter(msg.username)}
      title={msg.username_title}
      key={msg.id}
      status={msg.is_done == true ? <DoneChip label="Fait" /> : ""}
      pinned={msg.is_pinned == true ? <PinnedChip label="Important" /> : ""}
      message={msg.content}
      notebookId={msg.id}
    />
  ));


  return (
    <React.Fragment>
      <Helmet title="Espace de travail" />

      <Typography variant="h3" gutterBottom display="inline">
        <Grid container spacing={6}>
          <Grid item xs={8}>
            {" "}
            Cahier de consignes
          </Grid>
          <Grid item>
            <Button>
              {" "}
              <Loop onClick={refreshPage} />
            </Button>
          </Grid>
        </Grid>
      </Typography>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={9}>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="Votre consigne"
            placeholder="Ajouter votre consigne"
            fullWidth
          />
          <Button fullWidth variant="contained" color="primary">
            Ajouter la consigne
          </Button>
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
        <Grid container item xs={3}>
          <li Style="list-style-type:none;">
            {" "}
            <ul>
              <Chip
                size="small"
                color="primary"
                label="Tous"
                icon={<Group />}
              />
            </ul>
            <ul>
              <Chip
                size="small"
                color="primary"
                label="Réception"
                icon={<RoomService />}
              />
            </ul>
            <ul>
              {" "}
              <Chip
                size="small"
                color="secondary"
                label="Maintenance"
                icon={<Build />}
              />
            </ul>
            <ul>
              {" "}
              <Chip
                size="small"
                color="secondary"
                label="Etage"
                icon={<SingleBed />}
              />
            </ul>
            <ul>
              {" "}
              <Chip
                size="small"
                color="secondary"
                label="Manager"
                icon={<Group />}
              />
            </ul>
          </li>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Workspace;
