import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";

import "react-dragula/dist/dragula.css";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  TextField,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { AvatarGroup } from "@material-ui/lab";

import { spacing } from "@material-ui/system";

import { orange, green, blue } from "@material-ui/core/colors";

import { Add as AddIcon, CalendarToday } from "@material-ui/icons";

import { MessageCircle } from "react-feather";

import dragula from "react-dragula";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
  cursor: grab;

  &:hover {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const TaskWrapperContent = styled(CardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const TaskAvatars = styled.div`
  margin-left: 8px;
`;

const MessageCircleIcon = styled(MessageCircle)`
  color: ${(props) => props.theme.palette.grey[500]};
  vertical-align: middle;
`;

const TaskBadge = styled.div`
  background: ${(props) => props.color};
  width: 40px;
  height: 6px;
  border-radius: 6px;
  display: inline-block;
  margin-right: ${(props) => props.theme.spacing(2)}px;
`;

const TaskNotifications = styled.div`
  display: flex;
  position: absolute;
  bottom: ${(props) => props.theme.spacing(4)}px;
  right: ${(props) => props.theme.spacing(4)}px;
`;

const TaskNotificationsAmount = styled.div`
  color: ${(props) => props.theme.palette.grey[500]};
  font-weight: 600;
  margin-right: ${(props) => props.theme.spacing(1)}px;
  line-height: 1.75;
`;

const Typography = styled(MuiTypography)(spacing);

const TaskTitle = styled(Typography)`
  font-weight: 600;
  font-size: 15px;
  margin-right: ${(props) => props.theme.spacing(10)}px;
`;

function Lane({ title, description, onContainerLoaded, children }) {
  const handleContainerLoaded = (container) => {
    if (container) {
      onContainerLoaded(container);
    }
  };

  return (
    <Card mb={6}>
      <TextField
        fullWidth
        label="Vous pouvez écrire votre consigne ici"
        variant="outlined"
        m={2}
        multiline
      />
      <Button color="primary" variant="contained" fullWidth>
        <AddIcon />
        Ajouter une consigne
      </Button>
      <CardContent pb={0}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" mb={4}>
          {description}
        </Typography>
        <div ref={handleContainerLoaded}>{children}</div>
      </CardContent>
    </Card>
  );
}

function Task({ content, avatars }) {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <Typography>
          {" "}
          <CalendarToday style={{ fontSize: 15 }} /> Jeudi 7 Janvier
        </Typography>
        <Divider mb={3} />
        <TaskTitle variant="body1" gutterBottom>
          {content.title}
        </TaskTitle>

        {content.notifications && (
          <TaskNotifications>
            {" "}
            <TaskNotificationsAmount>
              {content.notifications}
            </TaskNotificationsAmount>
            <MessageCircleIcon />
          </TaskNotifications>
        )}
      </TaskWrapperContent>
    </TaskWrapper>
  );
}

const demoTasks = [
  {
    title: "Redesign the homepage",
    badges: [green[600]],
    notifications: 2,
  },
  {
    title: "Chambre 290 à faire en recouche s'il vous plait, merci à tous !",
    badges: [green[600]],
    notifications: 1,
  },
  {
    title: "Petit dejeuner leve tot, préparer des pains au chocolat",
    notifications: 4,
  },
  {
    title: "Improve site speed",
    badges: [green[600]],
    notifications: 3,
  },
];

const containers = [];

function Tasks() {
  const onContainerReady = (container) => {
    containers.push(container);
  };

  useEffect(() => {
    dragula(containers);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Tasks" />
      <Typography variant="h3" gutterBottom display="inline">
        Overlook Hôtel - Direction
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          tableau de bord
        </Link>
        <Link component={NavLink} exact to="/">
          Espace de travail
        </Link>
        <Typography>Overlook</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={4} xl={4}>
          <Lane onContainerLoaded={onContainerReady}>
            <Task content={demoTasks[1]} />
            <Task content={demoTasks[2]} />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Tasks;
