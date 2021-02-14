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
        L'espace manager est un tableau de bord qui vous permet de gérer votre
        établissement et votre équipe en toute simplicité.
        
      </Typography>

      <Typography variant="subtitle1" gutterBottom my={4}>
        Pour accéder à l'espace manager, assurez-vous de remplir les conditions
        suivantes:
        <ul>
          <li>Vous avez enregistré votre établissement sur Front Desk</li>
          <li>Votre compte dispose des droits nécessaires (statut d'équipe ou administrateur)</li>
        </ul>
      </Typography>
    </Box>
  );
}

function LearnMore() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Outils à votre disposition
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        Le tableau de bord vous donne accès à des outils de gestion et de
        communication exclusifs, selon votre abonnement vous pouvez utiliser les
        outils suivants
      </Typography>

      <Typography variant="subtitle1">
        {" "}
        En tant que propriétaire vous pouvez désigner d'autres collaborateurs
        comme manager, ces derniers pourront ainsi accéder aux mêmes
        priviléges cités plus haut à l'exception de la modification et la
        suppression de votre propriété.
      </Typography>

      <Divider mt={3} mb={3} />
      <Typography variant="h4" gutterBottom>
        Gestion de votre établissement
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        En accédant à la gestion de votre établissement vous pouvez modifier ses informations, mais également certaines préférences.
              L'établissement vous donne également accès à la modification de l'information du jour, cet contenu sera affiché sur un encart dans le tableau de bord de tous les utilisateurs
      </Typography>
      <Divider mt={3} mb={3} />
      <Typography variant="h4" gutterBottom>
        Gestion de votre équipe
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        Vous pouvez ajouter, modifier ou supprimer des utilisateurs très
        facilement, le tableau des utilisateurs indique le status de
        l'utilisateur, ses informations et son status. Vous pouvez changer leur
        mot de passe, désactiver leur compte temporairement, ou le supprimer.
      </Typography>

      <Divider mt={3} mb={3} />
      <Typography variant="h4" gutterBottom>
        Gestion des notifications et messages
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        Il est parfois nécessaire de communiquer une information à toute
        l'équipe ou un utilisateur en particulier, avec la gestion des
        notifications et message vous avez la possibilité d'envoyer un message
        privé à certains utilisateurs, ces derniers la recevront en direct.
      </Typography>

      <Divider mt={3} mb={3} />
      <Typography variant="h4" gutterBottom>
        Gestion des documents
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        Vous pouvez ajouter des documents, checklists et plannings facilement
        dans les sections appropriées, ces derniers se retrouveront sur le
        tableau de bord de votre équipe. Vous avez la possibilité d'ajouter un
        texte descriptif si besoin.
      </Typography>
    </Box>
  );
}

function DashboardManager() {
  return (
    <React.Fragment>
      <Helmet title="Compte propriétaire" />

      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            Espace manager
          </Typography>

          <Divider my={6} />

          <Introduction />

          <LearnMore />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DashboardManager;
