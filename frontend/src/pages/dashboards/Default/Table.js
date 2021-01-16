import React from "react";
import styled from "styled-components/macro";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { red, green, orange } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

// Data
let id = 0;
function createData(name, start, end, state, assignee) {
  id += 1;
  return { id, name, start, end, state, assignee };
}

const rows = [
  createData(
    "Création de la carte restaurant",
    "01/01/2020",
    "31/06/2020",
    <Chip label="Terminée" rgbcolor={green[500]} />,
    "Damien Jang "
  ),
  createData(
    "Animation de noël",
    "01/01/2020",
    "31/06/2020",
    <Chip label="En cours" rgbcolor={orange[500]} />,
    "Jean Peuplus"
  ),
  createData(
    "Soirée du personnel",
    "01/01/2020",
    "31/06/2020",
    <Chip label="Terminée" rgbcolor={green[500]} />,
    "Sallie Love"
  ),
];

const DashboardTable = () => (
  <Card mb={6}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertical />
        </IconButton>
      }
      title="Dernières missions"
    />
    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigné à</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.start}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default DashboardTable;
