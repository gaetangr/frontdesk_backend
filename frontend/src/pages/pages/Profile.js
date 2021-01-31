/**
 * Settings and information for a given user
 */
import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import Helmet from "react-helmet";

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
              defaultValue="John Doe"
              variant="outlined"
              fullWidth
              my={2}
            />
            <TextField
              id="linkedin"
              label="Titre"
              placeholder="Ex: réceptionniste, directeur, gouvernante"
              defaultValue=""
              variant="outlined"
              fullWidth
              my={2}
            />
            <TextField
              id="linkedin"
              label="Linkedin"
              defaultValue=""
              variant="outlined"
              fullWidth
              my={2}
            />

            <FormControl fullWidth my={2} variant="outlined">
              <TextField
                label="Biographie"
                id="biographie"
                multiline={true}
                rows={3}
                rowsMax={4}
                variant="outlined"
                placeholder="Ex: Je travaille comme réceptionniste à l'hôtel Overlook hôtel"
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <CenteredContent>
              <BigAvatar
                alt="Remy Sharp"
                src="/static/img/avatars/avatar-1.jpg"
              />
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
              label="Prénom"
              variant="outlined"
              defaultValue=""
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="last-name"
              label="Nom"
              variant="outlined"
              defaultValue=""
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          defaultValue=""
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
