import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";

import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Tooltip,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

import { StarBorder as StarIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const CardHeader = styled(MuiCardHeader)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Price = styled.div`
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
`;

const Header = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px 0;
`;

function Pricing() {
  return (
    <React.Fragment>
      <Helmet title="Pricing" />
      <Typography variant="h3" gutterBottom display="inline">
        Nos abonnements
      </Typography>

      <Divider my={6} />

      <Header>
        <Typography variant="h3" gutterBottom align="center">
          Choisissez l'abonnement qui vous convient le mieux
        </Typography>

        <Typography variant="subtitle1" gutterBottom align="center">
          Peu importe la taille et le budget de votre hôtel, nous avons un plan
          pour chacun d'entre vous
        </Typography>
      </Header>

      <Grid container justify="center">
        <Grid item xs={12} lg={10}>
          <Grid container spacing={6} alignItems="flex-end">
            <Grid item xs={12} md={4}>
              <Card p={5}>
                <CardHeader
                  title="Gratuit"
                  titleTypographyProps={{ align: "center" }}
                  pb={0}
                  pt={2}
                />
                <CardContent>
                  <Price>
                    <Typography
                      component="h2"
                      variant="h1"
                      color="textPrimary"
                      align="center"
                      display="inline"
                    >
                      0€
                    </Typography>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      align="center"
                      display="inline"
                    >
                      /mois
                    </Typography>
                  </Price>
                  <Typography variant="subtitle1" align="center">
                    20 collaborateurs
                    <br />
                    50 consignes/jour
                    <br />
                    Espace de travail
                    <br />
                    Assistance par email
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined" color="primary">
                    S'inscrire gratuitement
                  </Button>
                </CardActions>
                <Typography variant="caption" gutterBottom align="center">
                  L'offre gratuite ne nécessite aucun paiement
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card p={5}>
                <CardHeader
                  title="Premium"
                  subheader="Plus populaire"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={<StarIcon />}
                  pb={0}
                  pt={2}
                />
                <CardContent>
                  <Price>
                    <Typography
                      component="h2"
                      variant="h1"
                      color="textPrimary"
                      align="center"
                      display="inline"
                    >
                      9€
                    </Typography>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      align="center"
                      display="inline"
                    >
                      /mois
                    </Typography>
                  </Price>
                  <Typography variant="subtitle1" align="center">
                    100 collaborateurs
                    <br />
                    200 consignes/jour
                    <br />
                    Espace de travail
                    <br />
                    Hébérgement de plannings
                    <br />
                    Assistance par email prioritaire
                    <br />
                    Assistance par téléphone
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary">
                    S'abonner
                  </Button>
                </CardActions>
                <Typography variant="caption" gutterBottom align="center">
                  L'abonnement est facturé par mois et par établissement
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card p={5}>
                <CardHeader
                  title="Sponsors"
                  subheaderTypographyProps={{ align: "center" }}
                  titleTypographyProps={{ align: "center" }}
                  pb={0}
                  pt={2}
                />
                <CardContent>
                  <Price>
                    <Typography
                      component="h2"
                      variant="h1"
                      color="textPrimary"
                      align="center"
                      display="inline"
                    >
                      19€
                    </Typography>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      align="center"
                      display="inline"
                    >
                      /mois
                    </Typography>
                  </Price>
                  <Typography variant="subtitle1" align="center">
                    Abonnement premium
                    <br />
                    250 collaborateurs
                    <br />
                    Consignes/jour illimitées
                    <br />
                    Contact priviligié
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined" color="primary">
                    Nous soutenir
                  </Button>
                </CardActions>
                <Typography variant="caption" gutterBottom align="center">
                  L'abonnement est facturé par mois et par établissement
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <br />

          <Typography variant="caption" gutterBottom align="center">
            Si vous n'êtes pas satisfait à 100% nous vous remboursons votre
            abonnement, aucune justification requise, un simple email au support
            et le tour est joué !
          </Typography>
          <br />
          <Typography variant="caption" gutterBottom align="center">
            Le traitement des paiements en ligne sont gérés par notre paternaire
            Stripe
          </Typography>
          <br />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Pricing;
