import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import { Formik } from "formik";
import axios from "axios";
import { resetPassword } from "../../redux/actions/authActions";
import { FRONTDESK_API, TOKEN } from "../../constants/";
import {
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const textReset = "Reinitialiser le mot de passe";


  function createProperty() {
    axios({
      method: "post",
      url: `${FRONTDESK_API}/property/`,
      data: {
        name: "REACT TES",
        collaborator: [1],
      },
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    }).then((res) => {
   
    });
  }

  return (
    <Wrapper>
      <Helmet title={textReset} />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        {textReset}
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Veuillez renseigner votre email pour recevoir un mot de passe
      </Typography>
      <Alert mt={3} mb={2} severity="info">
        <AlertTitle>J'ai oublié mon adresse email</AlertTitle>
        Si vous avez oublié votre email, ou vous ne recevez pas l'email de
        changement de mot de passe, veuillez contacter votre administrateur
      </Alert>
      <Snackbar  open={open} autoHideDuration={6000} >
        <Alert  severity="success">
          Un email a été envoyé
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          email: "test@gmail.fr",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Doit être un email valide")
            .max(255)
            .required("L'email est requis"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              resetPassword(
                createProperty()
              )
            );
            //history.push("/auth/sign-in");
          } catch (error) {
            const message =
              error.message || "Quelque chose ne s'est pas bien passé";

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
              label="Adresse email"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
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
              {textReset}
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default ResetPassword;
