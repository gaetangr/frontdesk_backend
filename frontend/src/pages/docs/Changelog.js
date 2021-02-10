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

          <Divider my={6} />

          <Box mt={3}>
            <Typography variant="subtitle1">
              <Chip color="secondary" label="V1.0.0" /> – 18 Février 2020
              <ul>
                <li>Ajout de notifications </li>
                <li>Ajout d'une nouvelle interface web</li>
                <li>Modification de la version responsive</li>
                <li>Suppression de la fonction question/réponse</li>
                <li>Suppression de la fonction check-list</li>
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
