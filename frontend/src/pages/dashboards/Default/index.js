import React, {useState, useEffect} from "react";
import styled, { withTheme } from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../../constants";
import {
  Grid,
  TextField,
  Card as MuiCard,
  Paper,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { Edit } from "react-feather";
import { green, red } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import Actions from "./Actions";

// Custom components
import Workspace from "./Workspace";
import MyTeam from "./MyTeam";
import Logbook from "./LogbookLatest";

const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);

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
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <Card mb={7}>
            <Grid container justify="flex-end">
              <Edit  size={20} />
            </Grid>

            <Paper>
              {" "}
              <ReactMarkdown source={items.note} />{" "}
            </Paper>
          </Card>
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

export default withTheme(Default);
