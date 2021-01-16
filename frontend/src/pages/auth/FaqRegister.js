import React from "react";
import styled from "styled-components/macro";

import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Container,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const Wrapper = styled.div`
  ${spacing};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const Accordion = styled(MuiAccordion)`
  border: 1px solid
    ${(props) =>
      props.theme.palette.type === "dark"
        ? `rgba(255, 255, 255, .15)`
        : `rgba(0, 0, 0, .15)`};
  border-radius: 6px;
  box-shadow: 0;
  text-align: left;
  margin: 16px 0 !important;

  &:before {
    display: none;
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  padding: 0 16px;
  box-shadow: 0;
  min-height: 48px !important;

  .MuiAccordionSummary-content {
    margin: 12px 0 !important;
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
  padding-left: 16px;
  padding-right: 16px;
`;

function FAQ() {
  return (
    <Wrapper pt={20} pb={16}>
      <Container>
        <TypographyOverline variant="body2" gutterBottom>
          Création de compte
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          Questions fréquemment posées
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Spacer mb={8} />

        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} xl={8}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq1-content"
                id="faq1-header"
              >
                <Typography variant="subtitle1">
                  Qu'est-ce qu'un compte collaborateur ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Front desk réinvente l'hôtellerie de demain en proposant des
                  outils digitaux gratuits pensés par un hôtelier pour des
                  hôteliers.. Moins de papiers, plus d'efficacité ! En
                  rejoignant front-desk vous avez la certitude de gagner en
                  efficacité et en temps, tout est disponibe à porté de clic !
                  Front desk ne cesse de s'améliorer et propose une mise à jour
                  par mois, vous avez la garanti d'une plateforme toujours plus
                  performante et moderne !
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="subtitle1">
                  Qu'est-ce qu'un compte propriétaire ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Front desk est totalement gratuit, aucune pub ne viendra
                  gâcher votre travail. La plateforme ne changera pas de modèle
                  économique, en revanche il n'est pas exclu de proposer des
                  services premiums dans un futur proche.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="subtitle1">
                  Peut-on utiliser un compte commun ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Front desk est totalement gratuit, aucune pub ne viendra
                  gâcher votre travail. La plateforme ne changera pas de modèle
                  économique, en revanche il n'est pas exclu de proposer des
                  services premiums dans un futur proche.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="subtitle1">Est-ce gratuit ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  <img src="https://thumbor.sd-cdn.fr/0ZUY2gDYCK4e6Y2hIMVs1399dMM=/940x550/cdn.sd-cdn.fr/wp-content/uploads/2017/05/Rickroll.jpg"></img>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default FAQ;
