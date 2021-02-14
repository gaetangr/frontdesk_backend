import React from "react";
import styled from "styled-components/macro";
import { NavLink, Link} from "react-router-dom";

import { Helmet } from "react-helmet";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link as Links,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);
const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Contents() {
  return (
<div></div>
  );
}

function QuickStart() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Démarrer sur Front Desk
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Front Desk est une société de solutions digitales spécialisée dans
        l'hôtellerie. Nous proposons des outils modernes et performants pour
        améliorer votre productivité. Nous sommes le parfait partenaire de votre
        quotidien.
        <br />
        <br />
        Depuis 2020 nous proposons différents services pour augmenter la
        communication et la performance des hôtels partenaires, la version 2 de
        Front Desk est une application web complètement repensée pour répondre
        aux exigences techniques du moment.
        <br />
        <br />
        La version apporte également son lot de nouveaux outils et amélioration
        avec un système de notification, un espace manager, un tableau de bord
        et des prises de note pour chaque utilisateur.
      </Typography>
      <Typography variant="h3" gutterBottom>
        Choisir son abonnement
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Peu importe la taille et le budget de votre hôtel, nous avons un plan
        pour chacun d'entre vous. notre formule gratuite vous permet de
        découvrir notre plateforme sans aucune limite de temps, pour en savoir
        plus sur nos offre :{" "}
        <Link to="/pricing">Découvrir nos abonnements</Link>
      </Typography>
      <Typography variant="h3" gutterBottom>
        Nous contacter
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Si vous avez des questions concernant notre plateforme, n'hésitez pas à
        rentrer en contact avec un membre de notre équipe{" "}
        <Links href="mailto:hello@gaetangr.me">Nous contacter</Links>
      </Typography>
    </Box>
  );
}

function BuildTools() {
  return (
    <Box mb={10}>

    </Box>
  );
}

function GettingStarted() {
  return (
    <React.Fragment>
<QuickStart/>
    </React.Fragment>
  );
}

export default GettingStarted;
