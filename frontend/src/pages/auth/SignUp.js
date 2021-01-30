import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import axios from "axios";

import {
  Button,
  Tooltip,
  Checkbox,
  Divider,
  Paper,
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

  
  return (
    <Wrapper>
      <Helmet title="Inscription" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Rejoignez-nous
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Créez votre compte en quelques secondes !
      </Typography>
      <Alert mt={3} mb={2} severity="info">
        <AlertTitle>Information</AlertTitle>
        Les inscriptions sont ouvertes pour les propriétaires <u>uniquement</u>,
        une fois inscrit vous pourrez ajouter vos collaborateurs à votre
        établissement.
      </Alert>

      <Formik
        initialValues={{
          name: "desssd",
          email: "dz@gmail.fr",
          password: "paspassword$$$12sword$$$12",
          confirmPassword: "paspassword$$$12sword$$$12",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(4, "Trop court")
            .max(50, "Trop long")
            .required("Le nom est requis"),
          email: Yup.string()
            .email("L'email n'est pas valide")
            .max(255)
            .required("L'email est requis"),
          password: Yup.string()
            .min(8, "Au moins 8 charactères ")
            .max(255)
            .required("Requis"),
          confirmPassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Les mots de passe ne correspondent pas"
            ),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const name = values.name;
          const email = values.email;
          const password = values.password;
          try {
            await dispatch(
              signUp(
                axios({
                  method: "post",
                  url: "http://127.0.0.1:8000/api/v1/auth/registration/",
                  data: {
                    username: name,
                    email: email,
                    password1: password,
                    password2: password,
                  },
                })
                  .then((res) => {
                    console.log(res);
                    console.log(res.data.key);
                    localStorage.setItem("token", res.data.key);
                  })
                  .catch((error) => {
                    if (error.response) {
                    }
                  })
              )
            );
            //history.push("/auth/sign-in");
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
              type="text"
              name="name"
              required
              label="Nom d'utilisateur"
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="email"
              required
              name="email"
              label="Email"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="password"
              name="password"
              required
              label="Mot de passe"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="password"
              required
              name="confirmPassword"
              label="Confirmer le mot de passe"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Créer un compte propriétaire
            </Button>
            <Divider />
            <Divider />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignUp;
