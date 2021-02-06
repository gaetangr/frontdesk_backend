import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import axios from "axios";

import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  IconButton,
  Paper,
  Table,
  TableBody,
  Tooltip,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { red, green } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical, Mail, Edit, Trash2} from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

// Data
let id = 0;
function createData(source, users, sessions, bounce, avg) {
  id += 1;
  return { id, source, users, sessions, bounce, avg };
}

const rows = [
  createData(
    "Raphaël",
    "Directeur",
    <Mail size={18} />,
    <Edit size={18} />
  ),
];

const TrafficTable = () => (
  <Card mb={3}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertical />
        </IconButton>
      }
      title="Mon équipe"
    />

    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pseudo</TableCell>
              <TableCell align="right">Titre</TableCell>
              <TableCell align="right">Message privé</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.source}
                </TableCell>
                <TableCell align="right">{row.users}</TableCell>
                <TableCell align="right">{row.sessions}</TableCell>
                <TableCell align="right">{row.bounce}</TableCell>
                <TableCell align="right">{row.avg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default TrafficTable;
