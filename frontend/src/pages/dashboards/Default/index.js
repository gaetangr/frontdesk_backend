import React, { useState, useEffect } from "react";
import styled, { withTheme } from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Stats from "./Stats";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../../constants";
import {
  Grid,
  Card as MuiCard,
  Paper,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import Slide from "@material-ui/core/Slide";

import { spacing } from "@material-ui/system";

import Actions from "./Actions";
import Note from "./Note";
// Custom components
import Workspace from "./Workspace";
import MyTeam from "./MyTeam";

const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Default({ theme }) {
  const [items, setItems] = useState([]);

  function displayUser() {
    axios({
      method: "get",
      url: `${FRONTDESK_API}/users/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    }).then((res) => {
      setItems(res.data[0]);
      console
    });
  }
  useEffect(() => {
    displayUser();
  }, []);
  return (
    <React.Fragment>
      <Helmet title="Tableau de bord" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Tableau de bord
          </Typography>
          <Typography variant="subtitle1">
            Heureux de vous revoir, {items.first_name}!{" "}
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
       
    
      </Grid>
      <Note />
       <Grid item xs={12} lg={7}></Grid>
      
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
         {/*  <MyTeam /> */}
        </Grid>
        <Grid item xs={12} lg={7}>
          <Workspace />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withTheme(Default);
