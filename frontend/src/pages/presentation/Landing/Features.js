import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Button, Box, Container, Grid, Typography } from "@material-ui/core";

import { spacing } from "@material-ui/system";

import {
  Mail as MailIcon,
  Code as CodeIcon,
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
        <TypographyOverline variant="body2" gutterBottom>
          Fonctionalités
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          Les hôteliers adorent Front Desk
        </Typography>
        <Box mb={8} />
        <Grid container spacing={6}>
          <Feature
            Icon={HeartIcon}
            title="Par un hôtelier, pour des hôteliers"
            description="Material App is built to make your life easier. Theme provider, build tooling, documentation, and 400+ components. "
          />
          <Feature
            Icon={MailIcon}
            title="La sécurité est notre priorité"
            description="Certificat SSL, chiffrement des mots de passe, sauvegarde journalière des données, front-desk.fr prend la sécurité très au sérieux !"
          />
          <Feature
            Icon={PlusCircleIcon}
            title="Pensé pour durer"
            description="Nous utilisons les dernières technologies pour faire de front desk une solution d'avenir"
          />
          <Feature
            Icon={MailIcon}
            title="D'humain à humain"
            description="Nous sommes une équipe de passionné, nous connaissons le métier et nous sommes à l'écoute de vos retours."
          />
          <Feature
            Icon={UsersIcon}
            title="Une identité, une communauté"
            description="En rejoignant Front Desk, vous participez à l'hôtellerie de demain, digital, nomade et efficace."
          />
          <Feature
            Icon={BookOpenIcon}
            title="Documentation complète"
            description="Front Desk dispose d'une documentation complète, utiliser notre plateforme n'a jamais été aussi simple."
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
            Je me lance !
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Features;
