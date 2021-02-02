/**
 * All the routes are defined here
 */
import React from "react";

import async from "../components/Async";
import axios from "axios";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  Layout,
  List,
  Book,
  Monitor,

  Sliders,
  Users,
} from "react-feather";

// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));

// Legals components
const Terms = async(() => import("../pages/presentation/legals/Terms"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));


// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));


// Pages components
const Workspace = async(() => import("../pages/pages/Workspace"));
const Logbook = async(() => import("../pages/pages/Logbook"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Profile = async(() => import("../pages/pages/Profile"));

// Documentation
const Welcome = async(() => import("../pages/docs/Welcome"));
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const EnvironmentVariables = async(() =>
  import("../pages/docs/EnvironmentVariables")
);
const Deployment = async(() => import("../pages/docs/Deployment"));
const Theming = async(() => import("../pages/docs/Theming"));
const StateManagement = async(() => import("../pages/docs/StateManagement"));

const Changelog = async(() => import("../pages/docs/Changelog"));

// Landing
const Landing = async(() => import("../pages/presentation/Landing"));

// Protected routes
const ProtectedPage = async(() => import("../pages/protected/ProtectedPage"));

// Dashboard routes 
//------------------
const dashboardsRoutes = {
  id: "Tableau de bord",
  path: "/dashboard",
  header: "Outils",

  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Votre dashboard",
      component: Default,
    },
  ],
  component: null,
};

// Workspace routes 
//------------------
const workspaceRoutes = {
  id: "Espaces de travail",
  path: "/pages",
  icon: <Monitor />,
  children: [
    {
      path: "/pages/workspace",
      name: "Réception",
      component: Workspace,
    }
  ],
  component: null,
};

// Logbook routes 
//------------------
const logbookRoutes = {
  id: "Registres",
  path: "/pages",
  icon: <Book />,
  children: [,
    {
      path: "/pages/logbook",
      name: "Registre de maintenance",
      component: Logbook,
    },
  ],
  component: null,
};

// Checklist routes 
//------------------
const checklistRoutes = {
  id: "Check-list",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Matin",
      component: Workspace,
    },
  ],
  component: null,
};

// Tasks routes 
//------------------
const tasksRoutes = {
  id: "Tâches",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "2",
  component: Tasks,
  children: null,
};

// Profil routes 
//------------------
const ProfileRoutes = {
  id: "Mon compte",
  path: "/profile",
  icon: <Users />,
  children: null,
  component: Profile,
};

// Auth routes 
//------------------
const authRoutes = {
  id: "Authentification",
  path: "/auth",
  header: "Front Desk App",
  icon: <ExitToAppIcon />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Se connecter",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "S'enregistrer",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Mot de passe oublié",
      component: ResetPassword,
    },
  ],
  component: null,
};

// Documentations routes 
//------------------
const landingRoutes = {
  id: "Landing Page",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: Landing,
  children: null,
};

const documentationRoutes = {
  id: "Documentation",
  path: "/documentation",
  icon: <BookOpen />,
  children: [
    {
      path: "/documentation/getting-started",
      name: "Démarrer sur Front Desk",
      component: GettingStarted,
    },
    {
      path: "/documentation/environment-variables",
      name: "Votre compte",
      component: EnvironmentVariables,
    },
    {
      path: "/documentation/deployment",
      name: "Espace de travail",
      component: Deployment,
    },
    {
      path: "/documentation/theming",
      name: "Registre de maintenance",
      component: Theming,
    },
    {
      path: "/documentation/state-management",
      name: "J'ai un problème",
      component: StateManagement,
    },
  ],
  component: null,
};


// Changelog routes 
//------------------
const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v2.0.0",
  
  icon: <List />,
  component: Changelog,
  children: null,
};

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
  guard: AuthGuard,
};

// Routes for temrs, CGU and legals ...
const TermRoutes = {
  id: "Terms",
  path: "/terms",
  component: Terms,
  children: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  workspaceRoutes,
  logbookRoutes,
  checklistRoutes,
  ProfileRoutes,
  TermRoutes,
  tasksRoutes,
  authRoutes,
  documentationRoutes,
  changelogRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  workspaceRoutes,
  logbookRoutes,
  checklistRoutes,
  ProfileRoutes,
  authRoutes,
  documentationRoutes,
  changelogRoutes,
];
