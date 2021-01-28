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
const username = localStorage.getItem("username");
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
            Bonjour, {username}! Prêt pour une nouvelle journée ?{" "}
            <span role="img" aria-label="Waving Hand Sign">
              🚀
            </span>
          </Typography>
        </Grid>
        <Divider my={6} />
      </Grid>
    </React.Fragment>
  );
}

export default Default;
