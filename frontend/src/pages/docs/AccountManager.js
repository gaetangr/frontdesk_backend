import React from "react";
import styled from "styled-components/macro";
import { NavLink, Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,

  Typography as MuiTypography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";


const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Introduction() {
  return (
    <Box mb={10}>
      
      <br/>
      <Typography variant="h3" gutterBottom>
        Introduction
      </Typography>
     
      <Typography variant="subtitle1" gutterBottom>
        La page d'inscription est réservée aux futurs comptes manager,
        cela peut-être un adjoint de direction, chef de bridage, directeur, ou une personne souhaitant proposer le service à son équipe.
         Une fois le
        compte finalisé vous pourrez créer ceux de vos collaborateurs depuis l'espace manager
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom my={4}>
        Pour créer votre compte vous devez vous rendre sur la page d'inscription
        et remplir les champs suivants:
        <ul>
          <li>
            <strong> Identifiant:</strong> Il sera utilisé pour vous
            authentifier sur la plaforme et l'espace manager
          </li>
          <li>
            <strong> Nom de votre établissement:</strong> Le nom de votre
           hôtel ou la raison sociale
            pour un groupe de plusieurs hôtels.
          </li>
   
          <li>
            <strong> Email:</strong> L'email sera utilisé pour la confirmation
            de compte, la modification d'un mot de passe et, au besoin, une
            prise de contact avec l'équipe Front Desk.
          </li>
          <li>
            <strong> Mot de passe:</strong> Ce mot de passe sera utilisé pour vous identifier, gérer les comptes de votre équipe, les informations de votre établissement
          </li>
        </ul>
      </Typography>
    </Box>
  );
}

function LearnMore() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        En savoir plus
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        Un compte manager vous permet d'accéder à l'ensemble des outils Front
        Desk, il vous donne également accès à l'espage manager <Link to="dashboard-manager/"> En savoir plus</Link>
      </Typography>
      
      
    </Box>
  );
}



function AccountCreate() {
  return (
    <React.Fragment>
      <Helmet title="Compte propriétaire" />

      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            Créer un compte manager
          </Typography>

        

          <Divider my={6} />

          <Introduction />
      
          <LearnMore />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AccountCreate;
