import React from "react";
import styled from "styled-components/macro";

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

import { MoreVertical, Mail, Edit, Trash2, Eye, HelpCircle} from "react-feather";

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
    "Ne pas oublier le ménage chambre 202",
    "21 janvier 2021",
    <Eye size={18} />
  ),
  createData(
    "S'occuper des VIP avec un panier d'acceuil",
    "21 janvier 2021",
    <Eye size={18} />
  ),
];

const TrafficTable = () => (
  <Card mb={3}>
    <CardHeader
      action={
        <Tooltip title="Les consignes épinglées seront affichées ici">
          <IconButton aria-label="settings">
            <HelpCircle />
          </IconButton>
        </Tooltip>
      }
      title="Consignes épinglées"
    />

    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="right">Action</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default TrafficTable;
