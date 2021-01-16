import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { green, red } from "@material-ui/core/colors";
import { Settings } from "@material-ui/icons";

import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import Stats from "./Stats";
import Table from "./Table";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  // Similaire à componentDidMount et componentDidUpdate :


  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/api/v1/property/",
    data: { username: "REACT", email: "react@gmail.com", password1: "", password2: "" },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });},);
  return (
    <React.Fragment>
      <Helmet title="Tableau de bord" /> 

      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Tableau de bord
          </Typography>
          <Typography variant="subtitle1">
            Bonjour, Gaëtan ! Prêt pour une nouvelle journée ?{" "}
            <span role="img" aria-label="Waving Hand Sign">
              🚀
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Divider mb={5} />
              <form noValidate autoComplete="off">
                <TextField
                  fullWidth
                  defaultValue="Vérifier fin de mois 👌"
                  variant="outlined"
                  m={2}
                  multiline
                />
              </form>
              <Typography variant="caption" gutterBottom>
                Appuyez sur entrer pour enregistrer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} xl>
          <Card mb={6}>
            <CardContent title="koko">
              {" "}
              <Typography variant="h6" gutterBottom>
                Votre établissement
              </Typography>
              <Divider mb={5} />
              <Typography>
                <strong>Nom: </strong> Overlook Hôtel
              </Typography>
              <Typography>
                <strong>Collaborateurs: </strong> 52
              </Typography>
              <Typography>
                <strong>Licence: </strong> Valide
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="CA Restauration"
            amount="39.230€"
            chip="Mensuel"
            percentageText="+18%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="CA Hébergement"
            amount="9.230€"
            chip="Mensuel"
            percentageText="-18%"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
