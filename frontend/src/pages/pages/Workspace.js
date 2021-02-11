/**
 * Display the workspace and notebooks for collaborators
 * The form logic and all components related to the workspace
 * should be contain in this file
 */
import { FRONTDESK_API, TOKEN } from "../../constants/";
import React, { isValidElement, useEffect, useState } from "react";
import styled from "styled-components/macro";

import { useForm, Controller } from "react-hook-form";
import Helmet from "react-helmet";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import DateFnsUtils from "@date-io/date-fns";
import WorkspaceContent from "./WorkspaceContent";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiAlert from "@material-ui/lab/Alert";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  Chip,
  Button,
  Grid,
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

const CategoryChip = styled(Chip)`
  background-color: ${blue[700]};
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

function Workspace() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
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

  function getUser() {
    axios({
      method: "get",
      url: `${FRONTDESK_API}/users/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    }).then((response) => {
      setUser(response.data[0]);
      console.log(response.data[0].id)
    });
  }

  const [loading, setLoading] = useState("");
  const [category, setCategory] = useState("tous");
  const [value, setValue] = React.useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    displayNotebook();
    getUser();
    console.log("Loading state");
  }, []);

  const schema = yup.object().shape({
    TextField: yup
      .string()
      .required("Vous n'avez rien renseigné")
      .min(10, "Trop court ")
      .max(1000),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const options = ["Option 1", "Option 2"];
  const [valueSearch, setValueSearch] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-02-11")
  );
  const { register, handleSubmit, errors, control, reset } = methods;

  const onSubmit = (data) => {
    console.log(data.TextField);
    axios({
      method: "post",
      url: `${FRONTDESK_API}/notebook/create/`,
      data: {
        workspace: user.workspace,
        author: user.id,
        content: data.TextField,
        is_done: false,
        is_pinned: false,
        category: category,
        date: "2021-02-12T14:57:45Z",
      },
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    })
      .then(
        setOpen(false),
        setLoading(<LinearProgress variant="query" />),
        // set timeout
        setTimeout(() => {
          setLoading("");
          displayNotebook();
        }, 2500)
      )
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);

          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const workspaceForm = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Ajouter la consigne</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Option 1: pass a component to the Controller. */}
          <Controller
            as={
              <TextField
                multiline
                rows={4}
                autoFocus={true}
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

          <Controller
            as={
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Programmer la consigne"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            }
            name="Date"
            control={control}
            defaultValue=""
          />
        </form>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
            {value}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Ajouter la consigne
            {value}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
  const workspaceCard = items.map((msg) => {
    if (
      msg.category == `${category}` &&
      msg.dates == `${selectedDate.getDate()}-02-2021`
    )
      return (
        <WorkspaceContent
          name={capitalizeFirstLetter(msg.username)}
          title={msg.username_title}
          key={msg.id}
          status={msg.is_done == true ? <DoneChip label="Fait" /> : ""}
          pinned={msg.is_pinned == true ? <PinnedChip label="Important" /> : ""}
          message={msg.content}
          notebookId={msg.id}
          created={msg.date}
          edit={handleClickOpen}
        />
      );
  });

  const rightSidebar = (
    <li Style="list-style-type:none;">
      {" "}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Filter les consignes"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <ul>
        <Button
          onClick={() => {
            setCategory("tous");
          }}
          variant="contained"
          color="primary"
        >
          <Group />
          Tous
        </Button>
      </ul>
      <ul>
        <Button
          onClick={() => {
            setCategory("etage");
          }}
          variant="contained"
          color="primary"
        >
          <SingleBed />
          Étage
        </Button>
      </ul>
      <ul>
        <Button
          onClick={() => {
            setCategory("maintenance");
          }}
          variant="contained"
          color="primary"
        >
          <Build />
          Maintenance
        </Button>
      </ul>
    </li>
  );
  const AutocompleteField = (
    <Autocomplete
      id="highlights-demo"
      options={items}
      value={valueSearch}
      onChange={(event, newValue) => {
        setValueSearch(newValue);
      }}
      groupBy={(option) => option.date}
      getOptionLabel={(option) => option.date}
      openOnFocus="false"
      noOptionsText="Consigne introuvable"
      openText="Trier par date"
      freeSolo={false}
      clearText="Supprimer texte"
      getOptionLabel={(option) => option.content}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="Chercher une consigne"
          variant="outlined"
        />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.content, inputValue);
        const parts = parse(option.content, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 900 : 400 }}
              >
                {part.text.slice(0, 100)}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
  return (
    <React.Fragment>
      <Helmet title="Espace de travail" />
      {workspaceForm}
      <Typography variant="h3" gutterBottom display="inline">
        <Grid container spacing={6}>
          <Grid item xs={8}>
            {category == "tous"
              ? "Cahier de consignes"
              : category == "maintenance"
              ? "Registre de maintenance"
              : "autre"}
          </Grid>

          {/* Action right side */}
          <Grid item>
            <Button>
              <Loop onClick={handleClickOpen} />
            </Button>
          </Grid>
        </Grid>
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={9}>
          {loading}

          {/* Autocomplete form */}
          {AutocompleteField}

          <br />
          {valueSearch !== null ? (
            <CardContent>{valueSearch.content}</CardContent>
          ) : (
            ""
          )}

          {/* Autocomplete form */}
          {workspaceCard}
        </Grid>
        {/* Autocomplete form */}
        {rightSidebar}
      </Grid>
    </React.Fragment>
  );
}

export default Workspace;
