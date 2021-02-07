/**
 * Settings and information for a given user
 */
import React, {useState, useEffect} from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import { useForm, Controller } from "react-hook-form";
import Helmet from "react-helmet";
import {FRONTDESK_API, TOKEN} from "../../constants/"
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
    Link,
  Tooltip,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import firstLetter from "../../utils/utils"

import { Info } from "react-feather";
import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";
import axios from "axios";
import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;


function Public() {
  const [items, setItems] = useState([]);

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
    console.log(data.username);
    axios({
      method: "patch",
      url: `${FRONTDESK_API}/users/${items.id}/`,
      data: {
           "username": data.username
      },
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    })
      .then(displayUser)
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
  }, []);

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Informations publiques{" "}
          <Tooltip
            enterDelay={1}
            leaveDelay={300}
            TransitionComponent={Zoom}
            title="Visible par vos collégues"
          >
            <Info size={16} />
          </Tooltip>
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Option 1: pass a component to the Controller. */}
              <Controller
                as={
                  <TextField
                    id="username"
                    disabled
                    helperText="Veuillez contacter votre administrateur pour modifier votre pseudo"
                    label="Pseudo"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    my={2}
                  />
                }
                name="username"
                control={control}
                defaultValue={items.username}
              />

              <Controller
                as={
                  <TextField
                    disabled
                    helperText="Veuillez contacter votre administrateur pour modifier votre titre"
                    id="title"
                    label="Titre"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Ex: réceptionniste, directeur, gouvernante"
                    fullWidth
                    my={2}
                  />
                }
                defaultValue={items.title}
                name="title"
                control={control}
              />

              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
              >
                Sauvegarder les changements
              </Button>
            </form>
          </Grid>
          <Grid item md={4}>
            <CenteredContent>
              <BigAvatar alt="Remy Sharp">
                {firstLetter(`${items.first_name}`)}
                {firstLetter(`${items.last_name}`)}
              </BigAvatar>
              <label htmlFor="raised-button-file"></label>
              <Typography variant="caption">
                Votre avatar utilise votre prénom/nom
              </Typography>
            </CenteredContent>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Private() {
    const [items, setItems] = useState([]);

  const onSubmit = (data) => {
    console.log(data.username);
    axios({
      method: "patch",
      url: `${FRONTDESK_API}/users/${items.id}/`,
      data: {
        first_name: data.first_name,
        last_name: data.last_name,

      },
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    })
      .then(displayUser)
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
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fiche collaborateur{" "}
          <Tooltip
            enterDelay={1}
            leaveDelay={300}
            TransitionComponent={Zoom}
            title="Visible par vos collègues"
          >
            <Info size={16} />
          </Tooltip>
          <Typography variant="subtitle1"  gutterBottom>
            Votre fiche vous permet de renseigner des informations disponibles pour votre équipe 
          </Typography>
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="first-name"
              InputLabelProps={{ shrink: true }}
              label="Prénom"
              value={items.first_name}
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="last-name"
              InputLabelProps={{ shrink: true }}
              label="Nom"
              value={items.last_name}
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <TextField
          id="email"
          label="Email"
          type="email"
          InputLabelProps={{ shrink: true }}
          value={items.email}
          fullWidth
          my={2}
        />
        <TextField
          id="phone_number"
          label="Numéro de téléphone"
          InputLabelProps={{ shrink: true }}
          type="number"
          value={items.phone_number}
          fullWidth
          my={2}
        />
        <Button variant="contained" color="primary" mt={3}>
          Sauvegarder les changements
        </Button>
      </CardContent>
    </Card>
  );
}

function Settings() {
  
  return (
    <React.Fragment>
      <Helmet title="Profil" />

      <Typography variant="h3" gutterBottom display="inline">
        Profil
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Public />
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
