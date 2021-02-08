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

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const methods = useForm();
  const { register, handleSubmit, control, reset } = methods;

  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();

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
      {errorMessage}
    </Alert>
  </Snackbar>
);
  const onSubmit = (data) => {
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
        setLoading(<CircularProgress size={20} color="green" />);
        console.log(data.data.key);
        localStorage.setItem("token", data.data.key);
        console.log("vous allez être redigrié");
        setTimeout(() => {

          history.push("/dashboard/default", console.log("c'est bon"));
          document.location.reload();
        }, 3333);
      })
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          //console.log(error.response.data.detail);
           console.log("dzdz", error);
          if (error.response.data.username) {
            setErrorMessage(error.response.data.username[0]);
          }
          
          else if (error.response.data.email) 
            {setErrorMessage(error.response.data.email[0]);}
          else {
            setErrorMessage("Une erreur est survenue");
           }
          
        
          setError(true);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log("dzdz", error);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log("ddzdz", error);
      });
  };

  useEffect(() => {
    displayUser();
  }, []);
  
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
        <AlertTitle>Information</AlertTitle>
        Les inscriptions sont ouvertes pour les propriétaires <u>
          uniquement
        </u>{" "}
        <Link href="/documentation/account-manager">En savoir plus</Link>
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Option 1: pass a component to the Controller. */}
        <Controller
          as={
            <TextField
              autoComplete={false}
              id="username"
              autoFocus="true"
              label="Pseudo"
              placeholder="Identifiant utilisé pour l'authentification"
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

        <Controller
          as={<TextField id="email" label="Email" fullWidth my={2} />}
          defaultValue=""
          name="email"
          control={control}
        />

        <Button
          fullWidth
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          S'inscrire {loading}
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignUp;
