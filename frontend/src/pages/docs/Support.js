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

function Support() {
  return (
    <React.Fragment>
      <Helmet title="Support" />

      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            Support et assistance
          </Typography>

          <Divider my={6} />

          <Box mb={10}>
            <Typography variant="subtitle1" gutterBottom my={4}>
              Pour des questions concernant l'utilisation de l'application, des suggestions ou
              tout autre problème technique veuillez contacter 
               {""}
               <Link href="mailto:hello@front-desk.app">
            hello@front-desk.app
              </Link>
              <br />
              <br />
              Si vous avez des suggestions à apporter à l'application
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Support;
