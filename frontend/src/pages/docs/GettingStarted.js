import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import Code from "../../components/Code";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);
const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Contents() {
  return (
    <Box mb={10}>
      <Alert mt={3} mb={1} severity="info">
        Utilisez <strong>demo@frontdesk.fr</strong> and{" "}
        <strong>frontdesk2021</strong> pour essayer la plateforme
      </Alert>
      <Typography variant="h3" gutterBottom>
        Contents
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Inside the zip-file you'll find the following directories and files.
        Both compiled and minified distrubution files, as well as the source
        files are included in the package.
      </Typography>

      <Code>{`theme/
  ├── .gitignore
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── build/
  ├── public/
  │   ├── index.html
  │   └── manifest.json
  └── src/
      ├── components/
      ├── layouts/
      ├── pages/
      ├── redux/
      ├── routes/
      ├── vendor/
      ├── App.js
      ├── index.js
      └── theme.js`}</Code>
    </Box>
  );
}

function QuickStart() {
  return (
    <Box mb={10}>
      <Alert mt={3} mb={1} severity="info">
        Utilisez <strong>demo@frontdesk.fr</strong> and{" "}
        <strong>frontdesk2021</strong> pour essayer la plateforme
      </Alert>
      <Typography variant="h3" gutterBottom>
        Démarrer sur Front Desk
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Front desk est une plateforme d'outils pour hôteliers connectés 100%
        gratuite : Cahier de consignes, registre de maintenance, gestion de
        plannings et fichiers et bien plus ... L'outil est utilisé par les
        hôtels de grands groupes comme Accorhotels (majoritaire), Best Western,
        IHG, Mariotte International, Hilton Worlwide.
      </Typography>
      <Typography variant="h3" gutterBottom>
        Créer son établissement
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Front desk est une plateforme d'outils pour hôteliers connectés 100%
        gratuite : Cahier de consignes, registre de maintenance, gestion de
        plannings et fichiers et bien plus ... L'outil est utilisé par les
        hôtels de grands groupes comme Accorhotels (majoritaire), Best Western,
        IHG, Mariotte International, Hilton Worlwide.
      </Typography>

    
    </Box>
  );
}

function BuildTools() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Build tools
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Start a local webserver at <code>http://localhost:3000</code> and detect
        file changes:
        <br />
        <Code>npm start</Code>
      </Typography>

      <Typography variant="subtitle1" gutterBottom my={4}>
        Compile, optimize, minify and uglify all source files to build/:
        <br />
        <Code>npm run build</Code>
      </Typography>
    </Box>
  );
}

function GettingStarted() {
  return (
    <React.Fragment>

    </React.Fragment>
  );
}

export default GettingStarted;
