/**
 * Settings and information for a given user
 */
import React, {useState, useEffect} from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
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
            <TextField
              id="username"
              label="Pseudo"
              InputLabelProps={{ shrink: true }}
              value={items.username}
              fullWidth
              my={2}
            />
            <TextField
              disabled="okkoo"
              helperText="Veuillez contacter votre administrateur pour modifier votre titre"
              id="title"
              label="Titre"
              InputLabelProps={{ shrink: true }}
              placeholder="Ex: réceptionniste, directeur, gouvernante"
              value={items.title}
              fullWidth
              my={2}
            />
            <TextField
              id="linkedin"
              label="Linkedin"
              InputLabelProps={{ shrink: true }}
              value={items.linkedin}
              fullWidth
              my={2}
            />

            <FormControl fullWidth my={2}>
              <TextField
                label="Biographie"
                id="biographie"
                InputLabelProps={{ shrink: true }}
                multiline={true}
                rows={3}
                rowsMax={4}
                placeholder="Ex: Je travaille comme réceptionniste à l'hôtel Overlook hôtel"
                value={items.bio}
              />
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <CenteredContent>
              <BigAvatar alt="Remy Sharp" />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span">
                  <CloudUpload mr={2} /> Télécharger
                </Button>

                <Typography variant="caption" display="block" gutterBottom>
                  Pour un résultat optimal, veuillez utiliser une image au
                  format .jpg
                </Typography>
              </label>
            </CenteredContent>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary">
          Sauvegarder les changements
        </Button>
      </CardContent>
    </Card>
  );
}

function Private() {
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
    useEffect(() => {
      displayUser();
    }, []);
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Informations privées{" "}
          <Tooltip
            enterDelay={1}
            leaveDelay={300}
            TransitionComponent={Zoom}
            title="Visible par vous et l'administrateur de votre propriété"
          >
            <Info size={16} />
          </Tooltip>
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
          value={items.email}
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
