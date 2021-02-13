import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet";

import {
  Box,
  
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link,
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
      <Typography variant="h3" gutterBottom>
        Introduction
      </Typography>
     
      <Typography variant="subtitle1" gutterBottom>
        La création de compte est réservé aux propriétaires d'un établissement,
        cela peut-être un adjoint de direction, chef de bridage. Une fois le
        compte finalisé vous pourrez créer ceux de vos collaborateurs.
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
        Un compte propriétaire vous permet d'accéder à l'ensemble des outils Front
        Desk, il vous donne également un status d'administrateur, c'est-à-dire que
        vous êtes la seule personne à pouvoir créer des comptes, les supprimer
        et modifier les mots de passe, ainsi que les contenus.
      </Typography>
      
      <Typography variant="subtitle1">
        {" "}
        En tant que propriétaire vous pouvez désigner d'autres collaborateurs comme administrateur, ces derniers pourront ainsi accéder aux mêmes priviléges cités plus haut à l'exception de la modification et la suppression de votre
        propriété.
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
            Créer un compte propriétaire
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
