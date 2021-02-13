
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../constants/";
import { signIn } from "../../redux/actions/authActions";
import axios from "axios";
import { green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  LinearProgress,
  CircularProgress,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);
const username = localStorage.getItem("username");
const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)}px;
`;


const schema = yup.object().shape({

  username: yup.string().required("Veuillez renseigner votre pseudo").min(3, "Trop court "),
});

function SignIn() {

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, control,errors,touched, reset } = methods;
  const dispatch = useDispatch();
  const history = useHistory();
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState("")

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setError(false);
    };
  function displayUser() {
    axios({
      method: "get",
      url: `${FRONTDESK_API}/users/`,
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    }).then((res) => {
      setItems(res.data[0]);
    });
  }


  


  const errorCard = (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={error}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} variant="filled" severity="error">
        Connexion impossible, veuillez vérifier votre saisie
      </Alert>
    </Snackbar>
  );
  const onSubmit = (data) => {

    axios({
      method: "post",
      url: `${FRONTDESK_API}/login/`,
      data: {
        "username": data.username,
    "password": data.password,

      },
    
      

    })
      .then((data) => {
        setLoading(<LinearProgress />);
        localStorage.setItem("token", data.data.key)
        setTimeout(() => { history.push("/dashboard/default", ); document.location.reload(); }, 3000);


      }).then()
      .catch((error) => {
        if (error.response) {

          setError(true);
        }
         else if (error.request) {


    } else {

      
    }
  

      });
  };

  useEffect(() => {
    displayUser();
  }, []);


  return (
    <Wrapper>
      <Helmet title="Se connecter" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Bienvenue, visiteur!
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Connectez-vous pour continuer
        {errorCard}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Option 1: pass a component to the Controller. */}
        <Controller
          as={
            <TextField
              id="username"
           
              fullWidth
              helperText={<p>{errors.username?.message}</p>}
              my={2}
            />
          }
          name="username"
          label="Identifiant"
          control={control}
          defaultValue=""
        />

        <Controller
          as={
            <TextField
              id="password"
              type="password"
              label="Mot de passe"

              fullWidth
              my={2}
            />
          }
          defaultValue=""
          name="password"
          control={control}
        />

        <Button
          fullWidth
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Se connecter
        </Button>
      </form>
      {loading}
    </Wrapper>
  );
}

export default SignIn;
