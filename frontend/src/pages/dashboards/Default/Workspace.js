import { FRONTDESK_API, TOKEN } from "../../../constants";
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

];

function TrafficTable() {

  
  const [items, setItems] = useState([]);
    const displayNotebook = async () => {
      const reponse = await axios({
        method: "get",
        url: `${FRONTDESK_API}/notebook/list/pinned`,
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      });
      setItems(reponse.data); 
      console.log(reponse)
  };
   useEffect(() => {
     // Met à jour le titre du document via l’API du navigateur
     displayNotebook();
   }, []);
  const workspaceCard = items.map((msg) => (
     
     <TableRow key={msg.id}>
      <TableCell component="th" scope="row">
        {msg.content}
      </TableCell>
      <TableCell align="right">23 février</TableCell>
      <TableCell align="right"></TableCell>
  </TableRow>
  
  
  ));
  return (
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
        {workspaceCard}
      </TableBody>
    </Table>
        
        </TableWrapper>
      </Paper>
    </Card>
  );
}

export default TrafficTable;
