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
  TextField,
  Tooltip,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { red, green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { spacing } from "@material-ui/system";

import {
  MoreVertical,
  Eye,
  Mail,
  Edit,
  Trash2,
  MessageCircle,
  HelpCircle,
  Linkedin,
  Bell,
  Send,
} from "react-feather";

const Card = styled(MuiCard)(spacing);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

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
function createData(name, title, last_login, profil) {
  id += 1;
  return { id, name, title, last_login, profil };
}


function TrafficTable() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [profil, setProfil] = React.useState(false);
 const [items, setItems] = useState([]);
 const DisplayUsers = async () => {
   const reponse = await axios({
     method: "get",
     url: `${FRONTDESK_API}/collaborator/`,
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleProfil = () => {
    setProfil(true);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleNotification = () => {
    setOpen1(true);
    setOpen(false);
  };
  const handleClickOpenSnack = () => {
    setOpen1(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setProfil(false)
  };

  const userCard = (
    <Dialog
      align="center"
      open={profil}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Avatar />
        <br />
         - Réceptionniste
        <br />
        <Typography variant="caption">hello@gaetangr.me</Typography>
        <br />
        <Typography variant="caption">0627382727</Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <Card mb={3}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open1}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Message envoyé
        </Alert>
      </Snackbar>

      <CardHeader
        action={
          <Tooltip title="La liste de tous les collaborateurs, vous pouvez leur envoyer une notification privée et voir leur">
            <IconButton aria-label="settings">
              <HelpCircle />
            </IconButton>
          </Tooltip>
        }
        title="Mon équipe"
      />

      <Paper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Prénom</TableCell>
                <TableCell align="right">Titre</TableCell>
                <TableCell align="right">Message privé</TableCell>
                <TableCell align="right">Profil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button onClick={handleClickOpen} color="inherit">
                      <Mail size="19" />
                    </Button>
                  </TableCell>
                  <TableCell onClick={handleProfil} align="right">
                    <Eye size="19" />
                    {userCard}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour envoyer un message privée, remplissez le titre ou laissez-le
            par défault et le contenu, le collaborateur recevra une notification
            instantément.
          </DialogContentText>

          <TextField
            defaultValue="Vous avez un nouveau message privé"
            margin="dense"
            id="title"
            label="Titre du message"
            fullWidth
          />
          <TextField
            autoFocus={true}
            margin="dense"
            id="name"
            multiline
            label="Contenu du message"
            rows={5}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleNotification} color="primary">
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default TrafficTable;
