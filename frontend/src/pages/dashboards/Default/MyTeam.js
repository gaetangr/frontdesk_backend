import { FRONTDESK_API, TOKEN } from "../../../constants";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  IconButton,
  Paper,
  Divider,
  Typography,
  Avatar,
  Table,
  TableBody,
  Button,
  Tooltip,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Eye, Mail, Download, DownloadCloud, HelpCircle } from "react-feather";

const Card = styled(MuiCard)(spacing);

function TrafficTable() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState([]);
  const DisplayUsers = async () => {
    const reponse = await axios({
      method: "get",
      url: `${FRONTDESK_API}/documents/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    });
    setItems(reponse.data);
  };
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    DisplayUsers();
  }, []);

  const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

  return (
  
    <Card mb={3}>
  
      <CardHeader
        action={
          <Tooltip title="La liste de tous les documents ">
            <IconButton aria-label="settings">
              <HelpCircle />
            </IconButton>
          </Tooltip>
        }
        title="Mes documents"
      />

      <Paper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="left">Titre</TableCell>
                <TableCell align="right">Télécharger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.category}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button href={row.file} color="inherit">
                      <Download size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
}

export default TrafficTable;
