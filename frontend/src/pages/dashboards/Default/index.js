import React from "react";
import styled, { withTheme } from "styled-components/macro";

import { Helmet } from "react-helmet";

import {
  Grid,
  TextField,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import Actions from "./Actions";

// Custom components
import Workspace from "./Workspace";
import MyTeam from "./MyTeam";
import Logbook from "./LogbookLatest";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Analytics({ theme }) {
  return (
    <React.Fragment>
      <Helmet title="Tableau de bord" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Tableau de bord
          </Typography>
          <Typography variant="subtitle1">
            Heureux de vous revoir, Gaëtan!{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <TextField
            label="Mes notes - Personnel"
            multiline
            rows={10}
            variant="outlined"
            variant="filled"
            placeholder="Vous pouvez enregistrer des notes facilements"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={7}>
          <MyTeam />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <Logbook />
        </Grid>
        <Grid item xs={12} lg={7}>
          <Workspace />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withTheme(Analytics);
