import React, {useState, useEffect} from "react";
import styled, { withTheme } from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../../constants";
import {
  Grid,
  TextField,
  CardHeader,
  Button,
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

function Manager({ theme }) {
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
            Tableau de bord - Gestion d'utilisateurs
          </Typography>
          <Typography variant="subtitle1">
            Heureux de vous revoirssss, {items.first_name}!{" "}
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
            <CardHeader title="Mes notes personnelles" />
            <Grid container justify="flex-end">
            </Grid>

            <Paper>
              {" "}
              <ReactMarkdown mb={8} source={items.note} />{" "}
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <TextField
            multiline
            rows={6}
            variant="outlined"
            label="Votre note"
            placeholder="Modifier votre note"
            fullWidth
          />
          <Button
            fullWidth
            variant="contained"

            color="primary"
          >
            Modifier
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <MyTeam />
        </Grid>
        <Grid item xs={12} lg={7}>
          <Workspace />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withTheme(Manager);
