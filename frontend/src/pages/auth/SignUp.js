import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import { FRONTDESK_API, TOKEN } from "../../constants/";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";

import {
  Button,
  Snackbar,
  Paper,
  CircularProgress,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";


const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;


  /**
   * Unique component to 
   * handle the user registration view 
   */
function SignUp() {
  const history = useHistory();

  const methods = useForm();
  const { register, handleSubmit, control, reset } = methods;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

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
        {errorMessage}
      </Alert>
    </Snackbar>
  );

  /**
   * Get user ID from the user endpoint
   * end create a new property with
   * the id of the user
   *
   * @param {integer} token - Token to indentify the user
   * @param {integer} id - Primary key for the user
   */
  function getUser(id, token, name) {
    axios({
      method: "post",
      url: `${FRONTDESK_API}/property/`,
      data: {
        name: name,
        collaborator: [id],
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  /**
   * Handle logic when user click the submit button
   *
   * @param {string} data - Data from the user input
   *
   */
  const onSubmit = (data) => {
    
    axios({
      method: "post",
      url: `${FRONTDESK_API}/users/`,
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        getUser(response.data.user, response.data.token, data.name);
       
        setLoading(<CircularProgress size={20} color="green" />);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          
          history.push("/dashboard/default",);
          document.location.reload();
        }, );
      })
      .catch((error) => {
        if (error.response) {
          console.log("dzdz", error);
          if (error.response.data.username) {
            setErrorMessage(error.response.data.username[0]);
          } else if (error.response.data.email) {
            setErrorMessage(error.response.data.email[0]);
          } else {
            setErrorMessage("Une erreur est survenue");
          }
          setError(true);
        } else if (error.request) {
          console.log("dzdz", error);
        } else {
          console.log("Error", error.message);
        }
        console.log("ddzdz", error);
      });
  };

  return (
    <Wrapper>
      <Helmet title="Inscription" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Rejoignez-nous
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Ajoutez votre établissement à notre plateforme en quelques secondes !{errorCard}
      </Typography>
    

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Option 1: pass a component to the Controller. */}
        <Controller
          as={
            <TextField
              required
              id="username"
              autoFocus={true}
              label="Pseudo"
              helperText="L'identifiant sera lié à votre établissement"
              placeholder="Ex: H0827, DIRECTION..."
              fullWidth
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
              id="property"
              required
              placeholder="Ex:  Ibis Tour Eiffel"
              helperText="Le nom de votre établissement, par défault le nom de votre hôtel"
              label="Nom de votre établissement"
              fullWidth
              my={2}
            />
          }
          defaultValue=""
          name="name"
          control={control}
        />
        <Controller
          as={
            <TextField
              required
              id="password"
              type="password"
              label="Mot de passe"
              helperText="Choisissez un bon mot de passe, il sera utilisé pour vous identifier"
              fullWidth
              my={2}
            />
          }
          defaultValue=""
          name="password"
          control={control}
        />

        <Controller
          as={<TextField id="email" label="Email" fullWidth my={2} />}
          defaultValue=""
          name="email"
          required
          helperText="L'email sera utilisé pour envoyer un nouveau mot de passe"
          control={control}
        />

        <Button
          fullWidth
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Créer un compte propriétaire {loading}
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignUp;
