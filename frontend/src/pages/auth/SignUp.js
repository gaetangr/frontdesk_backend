import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { FRONTDESK_API, TOKEN } from "../../constants/";
import { useForm, Controller } from "react-hook-form";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import axios from "axios";

import {
  Button,
  Tooltip,
  Link,
  Snackbar,
  Checkbox,
  Divider,
  Paper,
  CircularProgress,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { AlertTitle } from "@material-ui/lab";

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

  const [user, setUser] = useState();
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
  function getUser(token, id) {
    axios({
      method: "get",
      url: `${FRONTDESK_API}/users/`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      axios({
        method: "post",
        url: `${FRONTDESK_API}/property/`,
        data: {
          name: "Mon établissement",
          collaborator: [res.data[0].id],
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    });
  }

  /**
   * Handle logic when user click the submit button
   *
   * @param {string} data - Data from the user input
   *
   */
  const onSubmit = (data) => {
    setUser(data.property);
    console.log(user);
    axios({
      method: "post",
      url: `${FRONTDESK_API}/auth/registration/`,
      data: {
        username: data.username,
        email: data.email,
        password1: data.password,
        password2: data.password,
      },
    })
      .then((data) => {
        console.log("ID:", data.data.key);
        setLoading(<CircularProgress size={20} color="green" />);
        localStorage.setItem("token", data.data.key);
        getUser(data.data.key, 1);
        setTimeout(() => {
          // history.push("/dashboard/default",);
          //document.location.reload();
        }, 3333);
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
        Créez votre compte en quelques secondes !{errorCard}
      </Typography>
      <Alert mt={3} mb={2} severity="warning">
        <AlertTitle>Attention</AlertTitle>
        Vous allez inscrire votre hôtel sur Front Desk, ce formulaire est
        réservé aux propriétaires ou un représentant de l'établissement
        <br />
        <br />
        <Link href="/documentation/account-manager">En savoir plus</Link>
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Option 1: pass a component to the Controller. */}
        <Controller
          as={
            <TextField
              required
              id="username"
              autoFocus="true"
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
          name="property"
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
