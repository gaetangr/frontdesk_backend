/**
 * Settings and information for a given user
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Zoom from "@material-ui/core/Zoom";
import { useForm, Controller } from "react-hook-form";
import Helmet from "react-helmet";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FRONTDESK_API, TOKEN } from "../../constants/";
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  Tooltip,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";


import { Info } from "react-feather";
import axios from "axios";
import { spacing } from "@material-ui/system";


const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);



const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

  const schema = yup.object().shape({


});

function CollaboratorCard() {

 const [items, setItems] = useState([]);
  const [userData, setuserData] = useState([]);
  

  
 
  

  const methods = useForm({
    defaultValues: { email: items.first_name, first_name: "" },
  });
  const { register, handleSubmit, control,errors,touched, reset } = methods;
 

  const onSubmit = (data) => {
    console.log(data.username);
    axios({
      method: "patch",
      url: `${FRONTDESK_API}/users/${items.id}/`,
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        title: data.title,
      },
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    })
      .then(displayUser)
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data.detail);

          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else {console.log("erreur")}
      });
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

  
  
 useEffect(() => {
   displayUser()
   


 }, []);


useEffect((res) => {
 
  

}, [items]);

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fiche collaborateur{" "}
          <Tooltip title="Visible par vos collègues">
            <Info size={16} />
          </Tooltip>
          <Typography variant="subtitle1" gutterBottom>
            Votre fiche vous permet de renseigner des informations disponibles
            pour votre équipe {items.first_name}
          </Typography>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item md={8}></Grid>

            <Grid item md={6}>
              <Controller
                as={
                  <TextField
                    id="first_name"
                    InputLabelProps={{ shrink: true }}
                    label="Prénom"
                    fullWidth
                    helperText={items.first_name}
                    variant="outlined"
                    my={2}
                  />
                }
                ref={register}
                
                name="first_name"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                as={
                  <TextField
                    id="last_name"
                    InputLabelProps={{ shrink: true }}
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    my={2}
                  />
                }
                name="last_name"
                defaultValue={items.last_name}
                control={control}
              />
            </Grid>
          </Grid>
          <Controller
            as={
              <TextField
                id="username"
                InputLabelProps={{ shrink: true }}
                label="Identifiant"
                defaultValue={items.username}
                fullWidth
                variant="outlined"
                my={2}
              />
            }
            name="username"
            label="Identifiant"
            control={control}
            defaultValue={items.username}
          />
          <Controller
            as={
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                my={2}
              />
            }
            name="email"
            control={control}
            defaultValue={items.email}
          />

          <Controller
            as={
              <TextField
                id="title"
                label="Fonction"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                placeholder="Ex: réceptionniste, directeur, gouvernante"
                defaultValue={items.title}
                fullWidth
                my={2}
              />
            }
            name="title"
            control={control}
            defaultValue={items.title}
          />

          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            mt={3}
          >
            Sauvegarder les changements
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


function Settings() {
  return (
    <React.Fragment>
      <Helmet title="Profil" />

      <Typography variant="h3" gutterBottom display="inline">
        Profil
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CollaboratorCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
