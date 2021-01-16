import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Accordion = styled(MuiAccordion)`
  border: 1px solid
    ${(props) =>
      props.theme.palette.type === "dark"
        ? `rgba(255, 255, 255, .15)`
        : `rgba(0, 0, 0, .15)`};
  border-radius: 6px;
  box-shadow: 0;
  text-align: left;
  margin: 16px 0 !important;

  &:before {
    display: none;
  }
`;
const AccordionDetails = styled(MuiAccordionDetails)`
  padding-left: 16px;
  padding-right: 16px;
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  padding: 0 16px;
  box-shadow: 0;
  min-height: 48px !important;

  .MuiAccordionSummary-content {
    margin: 12px 0 !important;
  }
`;

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

function Private() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Informations de votre établissement
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}></Grid>
        </Grid>

        <TextField
          id="email"
          label="Nom"
          variant="outlined"
          type="text"
          placeholder="Ex: Overlook Hôtel"
          helperText="Visible publiquement par vos collaborateurs"
          fullWidth
          my={2}
        />
        <TextField
          id="email"
          label="Email principal"
          variant="outlined"
          type="email"
          helperText="Point de contact principal"
          defaultValue="caroline.j@gmail.com"
          fullWidth
          my={2}
        />

        <TextField
          id="address2"
          label="Groupe hôtelier"
          variant="outlined"
          fullWidth
          my={2}
        />

        <TextField
          not
          id="address"
          label="Adresse"
          variant="outlined"
          fullWidth
          my={2}
        />
        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="city"
              label="Ville"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              id="state"
              label="Pays"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>

        <Button variant="contained" color="primary" mt={3}>
          Enregistrer les informations
        </Button>
      </CardContent>
    </Card>
  );
}

function Settings() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        Réglages
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Pages
        </Link>
        <Typography>Settings</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
