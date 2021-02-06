import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  margin-top: -3px;
  font-weight: bold;
  font-size: 75%;
`;

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Changelog() {
  return (
    <React.Fragment>
      <Helmet title="Changelog" />

      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            Journal des modifications
          </Typography>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Typography>Journal des modifications</Typography>
          </Breadcrumbs>
          <Divider my={6} />
          <Typography variant="p" gutterBottom display="inline">
            Chaque modifications de la plateforme Front-Desk seront documentées
            sur cette page. Le format de journal des modifications suit le
            format{" "}
            <Link exact to="https://keepachangelog.com/en/1.0.0/">
              Keep a Changelog{" "}
            </Link>
            et le projet applique le{" "}
            <Link to="https://semver.org/spec/v2.0.0.html">
              versionnage sémantique
            </Link>
            <br />
            <br />
            <Typography variant="h6"> Catégories de changement:</Typography>
            <ul>
              <li>
                <strong>Ajouté</strong> pour de nouvelles fonctionnalités
              </li>
              <li>
                <strong>Changé</strong> pour des modifications de
                fonctionnalités
              </li>
              <li>
                <strong>Supprimé</strong> pour des suppressions de
                fonctionnalités
              </li>
              <li>
                <strong>Corrigé</strong> pour des corrections de bogues et
                fonctionnalités
              </li>
            </ul>
          </Typography>
          <Divider my={6} />

          <Box mt={3}>
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v2.0.0" /> – 28 Janvier 2020
              <ul>
                <li>Ajouter d'une nouvelle interface web</li>
                <li>Ajouter d'une nouvelle interface web</li>
                <li>Suppression de la fonction question/réponse</li>
              </ul>
            </Typography>
            <Divider my={6} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Changelog;
