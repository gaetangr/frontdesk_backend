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
        <Typography variant="h2" component="h3" gutterBottom>
          Questions fréquemment posées
        </Typography>

        <Spacer mb={8} />

        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} xl={8}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq1-content"
                id="faq1-header"
              >
                <Typography variant="subtitle1">Qui sommes-nous ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Front Desk est une société de solutions digitales spécialisée
                  dans l'hôtellerie. Nous proposons des outils modernes et
                  performants pour améliorer votre productivité. Nous sommes le
                  parfait partenaire de votre quotidien.
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
                  Quels abonnements proposons-nous ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Front Desk s'adapte à vos besoins, pour en savoir plus sur nos
                  différentes offres :{" "}
                  <Link href="/pricing">Découvrir les abonnements</Link>
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
                  Pourquoi travailler avec nous ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Nos outils sont pensés pour les hôteliers, nous proposons une
                  organisation digitale dématerialisée qui vous permettra de
                  gagner du temps et de vous adapter à toute situation.
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
                  Quelles fonctionnalités sont disponibles ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  A ce jour nous proposons les services suivants :
                  <ul>
                    <li>Cahier de consignes</li>
                    <li>Système de recherche et de filtrage des consignes</li>
                    <li>Regitre de maintenance</li>
                    <li>Système de notification en temps réel</li>
                    <li>Messages privés entre collaborateurs</li>
                    <li>Hébergement des documents (planning, checklist...)</li>
                    <li>Espace manager pour gérer son établissement</li>
                    <li>
                      Tableau de bord avec prise de notes et information du jour
                    </li>
                  </ul>
                  <strong>
                    De nombreux outils sont en cours de réalisation pour l'année
                    2021{" "}
                  </strong>
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
                  J'ai encore des questions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" color="textSecondary">
                  Si vous souhaitez en savoir plus sur notre plateforme, n'hésitez pas à <Link href="mailto:hello@gaetangr.me">nous contacter</Link>
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
