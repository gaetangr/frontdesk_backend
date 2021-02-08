import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Helmet from "react-helmet";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import {
    CardActionArea,
    Avatar,
  CardActions,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(4),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(30),
      height: theme.spacing(30),
      margin: theme.spacing(7)
    
  },
}));

function TeamCard(props) {
    const classes = useStyles();
    return (
      <Card mb={6}>
        <CardActionArea>
          <Avatar
            Style="float: left"
            className={classes.large}
            alt="Gaëtan"
            src={props.avatar}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography gutterBottom variant="">
              {props.date}
            </Typography>
            <br />
            <br />
            <Typography component="p">{props.content}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <MailIcon />
          </Button>
          <Button size="small" color="primary">
            <LinkedInIcon />
          </Button>
        </CardActions>
      </Card>
    );
}

function Cards() {
  return (
    <React.Fragment>
      <Helmet title="Cards" />
      <Typography variant="h3" gutterBottom display="inline">
        Notre équipe
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <TeamCard
            name="Gaëtan - Fondateur"
            date="Février 2020 - Aujourd'hui"
            avatar="https://media-exp1.licdn.com/dms/image/C5603AQECxqBiAO9Zsw/profile-displayphoto-shrink_800_800/0/1517412573625?e=1617840000&v=beta&t=u4_PECNhW_KwLcTC1QsPET0tUmgaEMeCKJjtGaF5Kx4"
            content="Après 7 années dans l'hôtellerie j'ai décidé en janvier 2021 de lancer ma société Front Desk qui propose des outils digitaux pour hôteliers"
                      
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TeamCard
            name="Caroline - Chargée de marketing digital"
            date="Février 2021 - Aujourd'hui"
            avatar="https://media-exp1.licdn.com/dms/image/C4D03AQFTiSEOFMRq7w/profile-displayphoto-shrink_800_800/0/1590424810902?e=1617840000&v=beta&t=tHSzlkOkyZSz3u7wx3lbvJuM3_GfWVKb6So3I_j0TWI"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Cards;
