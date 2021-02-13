import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Button, Box, Container, Grid, Typography } from "@material-ui/core";

import { spacing } from "@material-ui/system";

import {
  Mail as MailIcon,
  Sunrise as SunriseIcon,
  Code as CodeIcon,
  Shield as ShieldIcon,
  Heart as HeartIcon,
  Users as UsersIcon,
  Figma as FigmaIcon,
  BookOpen as BookOpenIcon,
  PlusCircle as PlusCircleIcon,
} from "react-feather";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const FeatureWrapper = styled.div`
  display: flex;
  text-align: left;
  padding: 18px 20px;
`;

const FeatureIcon = styled.div`
  svg {
    flex-shrink: 0;
    width: auto;
    height: 32px;
    width: 32px;
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const Feature = ({ Icon, title, description }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <FeatureWrapper>
        <FeatureIcon>
          <Icon />
        </FeatureIcon>
        <Box ml={6}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </FeatureWrapper>
    </Grid>
  );
};

function Features() {
  return (
    <Wrapper py={20}>
      <Container>

        <Typography variant="h2" component="h3" gutterBottom>
          Vous allez nous adorer 
        </Typography>
        <Box mb={8} />
        <Grid container spacing={6}>
          <Feature
            Icon={HeartIcon}
            title="Par un hôtelier, pour des hôteliers"
            description="Fondé par un réceptionniste conscient des problématiques du quotiden souhaitant moderniser son métier."
          />
          <Feature
            Icon={ShieldIcon}
            title="La sécurité est notre priorité"
            description="Certificat SSL, chiffrement des mots de passe, sauvegarde journalière des données, Front Desk prend la sécurité au sérieux."
          />
          <Feature
            Icon={SunriseIcon}
            title="Une solution d'avenir"
            description="Nous utilisons les dernières technologies pour faire de Front Desk un outil évolutif et durable."
          />
          <Feature
            Icon={MailIcon}
            title="Disponible pour vous"
            description="Nous sommes une équipe de passionnés, toujours à l'écoute de vos besoins."
          />
          <Feature
            Icon={UsersIcon}
            title="Une identité, une communauté"
            description="En rejoignant Front Desk, vous participez à l'hôtellerie de demain, digital, nomade et efficace."
          />
          <Feature
            Icon={BookOpenIcon}
            title="Facile à utiliser"
            description="Notre plateforme est conçue pour être adopter rapidement par tous."
          />
        </Grid>

        <Box mt={4}>
          <Button
            component={NavLink}
            to="/documentation/welcome"
            variant="contained"
            color="secondary"
            size="large"
            target="_blank"
          >
            Je me lance 
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Features;
