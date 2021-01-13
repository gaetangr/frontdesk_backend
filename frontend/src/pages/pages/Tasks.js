import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "firstNassme",
    headerName: "Nom",
    description: "Nom du collaborateur",
    width: 200,
  },
  {
    field: "lastNamsse",
    headerName: "Titre",
    width: 200,
    description: "Nom du collaborateur",
  },
  {
    field: "props",
    headerName: "Propriétaire",
    description: "Fonction au sein de l'établissement",
    type: "number",
    width: 200,
  },
  {
    field: "prospsss",
    headerName: "Action",
    type: "number",
    description: "Gérer les différentes actions pour le collaborateur",
    width: 200,
  },
];

const rows = [];

function DataGridDemo() {
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Gestion des collaborateurs
        </Typography>
        <Typography variant="body2" gutterBottom>
          Passez votre souris sur les différents champs pour en savoir
        </Typography>
      </CardContent>
      <Paper>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Paper>
    </Card>
  );
}

function DataGridPage() {
  return (
    <React.Fragment>
      <Helmet title="Data Grid" />
      <Typography variant="h3" gutterBottom display="inline">
        Data Grid
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Tables
        </Link>
        <Typography>Data Grid</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default DataGridPage;
