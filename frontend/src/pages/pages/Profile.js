import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Helmet from "react-helmet";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import { positions } from "@material-ui/system";
import {
  CalendarToday
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import {
  CardContent,
  CardActions,
  CardHeader,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Grid,
  Tooltip,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
import { spacing } from "@material-ui/system";
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));
const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function WorkspaceContent(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
   const handleClose = () => {
     setState({ ...state, open: false });
   };

  return (
    <Card mb={6}>
      <CardContent
      >
        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            Le message a été marqué comme fait
          </Alert>
        </Snackbar>

        <CardHeader
          avatar={<Avatar className={classes.purple}>G</Avatar>}
          action={<IconButton aria-label="settings"></IconButton>}
          title={`${props.name} - ${props.title}`}
          subheader="14 janvier, 2020"
        />

        <Divider mb={3} />
        <Typography variant="p" gutterBottom>
          {props.message}
        </Typography>
      </CardContent>

      <Box display="flex" flexDirection="row">
        <Divider mb={3} />
        <CardActions flexDirection="row-reverse" align="right">
          <Button size="small" color="primary">
            Répondre
          </Button>
          <Button size="small" color="secondary">
            Marquer comme fait
          </Button>
          <Button
            onClick={handleClick({ vertical: "top", horizontal: "right" })}
            size="small"
            color="secondary"
          >
            Important
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

function Workspace() {
  return (
    <React.Fragment>
      <Helmet title="Blank" />
      <Typography variant="h3" gutterBottom display="inline">
        Cahier de consignes
      </Typography>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={9}>
          <WorkspaceContent
            name="Gaetan"
            title="Réceptionniste"
            message="Ne pas oublier de donner la chambre 206 aux femmes de chambre pour
          ménage"
          />
          <WorkspaceContent
            name="Antoinette"
            title="Gouvernante"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          ménage"
          />
          <WorkspaceContent
            name="Raphaël"
            title="Directeur"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Workspace;
