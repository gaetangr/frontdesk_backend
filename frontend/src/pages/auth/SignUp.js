import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import Faq from "./FaqRegister";

import {
  Button,
  Divider,
  Paper,
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

      <Formik
        initialValues={{
          name: "Gaëtan",
          email: "demo@frontdesk.fr",
          password: "frontdesk",
          confirmPassword: "frontdesk",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Le nom est requis"),
          email: Yup.string()
            .email("L'email n'est pas valide")
            .max(255)
            .required("L'email est requis"),
          password: Yup.string()
            .min(12, "Au moins 12 charactères ")
            .max(255)
            .required("Required"),
          confirmPassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Les mots de passe ne correspondent pas"
            ),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signUp({
                name: "test",
                company: "test",
                email: values.email,
                password: values.password,
              })
            );
            history.push("/auth/sign-in");
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
              helperText={"Sera visible par tous"}
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
              label="Mot de pase"
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
            <Alert mt={3} mb={2} severity="info">
              Front desk V2.0 est actuellement <strong>Beta</strong>
            </Alert>
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
            <Button
              mt="3"
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
            >
              Créer un compte collaborateur
            </Button>
          </form>
        )}
      </Formik>
      <Faq />
    </Wrapper>
  );
}

export default SignUp;
