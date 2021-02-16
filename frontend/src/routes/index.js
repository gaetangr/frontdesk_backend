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

import { FRONTDESK_API, TOKEN } from "../constants/";


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
const Tasks = async(() => import("../pages/pages/Tasks"));
const Profile = async(() => import("../pages/pages/Profile"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Team = async(() => import("../pages/pages/Team"));


// Documentation
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const AccountManager = async(() =>
  import("../pages/docs/AccountManager")
);
const DashboardManager = async(() => import("../pages/docs/DashboardManager"));
const Support = async(() => import("../pages/docs/Support"));
const WorkspaceDoc = async(() => import("../pages/docs/Workspace"));
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
  path: "/dashboard/default",

  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Mon espace",
      component: Default,

    },
  
  ],
  component: null,
};

// Workspace routes
//------------------
const workspaceRoutes = {
  id: "Espaces de travail",
  path: "/pages/workspace",
  name: "Réception",

  component: Workspace,
  icon: <Monitor />,
  children: null,
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
      name: "S'inscrire",
      component: SignUp,
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
      path: "/documentation/account-manager",
      name: "Compte propriétaire",
      component: AccountManager,
    },
    {
      path: "/documentation/dashboard-manager",
      name: "Espace manager",
      component: DashboardManager,
    },
    {
      path: "/documentation/markdown",
      name: "Formater son texte",
      component: WorkspaceDoc,
    },
    {
      path: "/documentation/support",
      name: "Support et assistance",
      component: Support,
    },
  ],
  component: null,
};


// Changelog routes
//------------------
const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v1.0.0",

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

// Routes for temrs, CGU and legals ...
const PricingRoutes = {
  id: "Pricing",
  path: "/pricing",
  component: Pricing,
  children: null,
};

// Routes for temrs, CGU and legals ...
const TeamRoutes = {
  id: "Team",
  path: "/team",
  component: Team,
  children: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  workspaceRoutes,
  //checklistRoutes,
  //ProfileRoutes,
  //TeamRoutes,
  PricingRoutes,
  TermRoutes,
  //tasksRoutes,
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
  //logbookRoutes,
  //checklistRoutes,
  //ProfileRoutes,
  authRoutes,
  documentationRoutes,
  changelogRoutes,
];
