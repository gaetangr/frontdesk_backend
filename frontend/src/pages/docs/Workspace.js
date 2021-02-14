import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import Code from "../../components/Code";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);



function HowItWorks() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Comment sa marche
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Il est parfois nécessaire de formater son texte pour mettre en valeur
        son contenu, Front Desk met à disposition un formatage simple et rapide
        à prendre en main.
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        En utilisant les balises de formatage vous pouvez ajouter des images et des liens, créer des listes, mettre en avant un contenu sur la plupart des outils Front Desk.
      </Typography>
      <Typography variant="h3" gutterBottom>
       Outils compatibles
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Vous pouvez utiliser le formatage pour les outils suivants :
         
    <ul><li>Notes personnelles </li>
          <li>Cahier de consignes</li>
        <li>Information du jour</li></ul>
      </Typography>
      <Typography variant="h3" gutterBottom>
        Exemples d'usage
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Voici un exemple de balises que vous pouvez utiliser pour formater votre
        contenu
        <ul>
          <li>
            <ReactMarkdown source="**Texte en gras**" />
            <Code>**Texte en gras**</Code>
          </li>
          <li>
            <ReactMarkdown source="_Texte en italique_" />
            <Code>_Texte en italique_</Code>
          </li>
          <li>
            <ReactMarkdown source="#  Titre 1" />
            <Code># Titre 1</Code>
          </li>

          <li>
            <ReactMarkdown source="## Titre 2" />
            <Code>## Titre 2</Code>
          </li>
          <li>
            <ReactMarkdown source=">Ceci est une **zone en retrait**." />
            <Code>>Ceci est une **zone en retrait**.</Code>
          </li>

          <li>
            <ReactMarkdown source=">- Liste1" />
            <Code>- Liste1</Code>
          </li>
          <li>
            <ReactMarkdown source='Ici ce qui suit [Lien](https://example.com/ "titre de lien optionnel").' />
            <Code>
              Ici ce qui suit [Lien](https://example.com/ "titre de lien
              optionnel").
            </Code>
          </li>

          <li>
            <ReactMarkdown source="![Ceci est un exemple d’image](https://via.placeholder.com/150)" />
            <Code>
              ![Ceci est un exemple d’image](https://example.com/bild.jpg)
            </Code>
          </li>
        </ul>
      </Typography>
    </Box>
  );
}



function Theming() {
  return (
    <React.Fragment>
      <Helmet title="Formater son texte" />

      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            Formater son texte
          </Typography>

          <Divider my={6} />

        
          <HowItWorks />
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Theming;
