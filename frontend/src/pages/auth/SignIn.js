
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../../redux/actions/authActions";
import axios from "axios";

import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
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

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [key, setKey] = useState("blabla");
  /*useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/property/",
      headers: {
        Authorization: "Token b325d52b7e3352910a119a7ffe461f77fa77452d",
      },
    })
      .then((res) => {
        console.log();
        
      })

              

  });*/
  return (
    <Wrapper>
      <Helmet title="Se connecter" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Bienvenue, {username ? username : "visiteur"} !
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Connectez-vous pour continuer
      </Typography>

      <Formik
        initialValues={{
          email: "demo@bootlab.io",
          password: "unsafepassword",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(255).required("L'email est requis"),
          password: Yup.string()
            .max(255)
            .required("Le mot de passe est requis"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signIn({ email: values.email, password: values.password }
              )
            );
            history.push("/dashboard/default");
          } catch (error) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              name="email"
              label="Pseudo"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <TextField
              type="password"
              name="password"
              label="Mot de passe"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se rappeler de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Se connecter
            </Button>
            <Button
              component={Link}
              to="/auth/reset-password"
              fullWidth
              color="primary"
            >
              Mot de passe oublié
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignIn;
