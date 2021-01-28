import React from "react";

import async from "../components/Async";


import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  Layout,
  List,
  Book,
  Bookmark,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
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
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));


// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));

// Documentation
const Welcome = async(() => import("../pages/docs/Welcome"));
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const EnvironmentVariables = async(() =>
  import("../pages/docs/EnvironmentVariables")
);
const Deployment = async(() => import("../pages/docs/Deployment"));
const Theming = async(() => import("../pages/docs/Theming"));
const StateManagement = async(() => import("../pages/docs/StateManagement"));
const APICalls = async(() => import("../pages/docs/APICalls"));
const ESLintAndPrettier = async(() =>
  import("../pages/docs/ESLintAndPrettier")
);
const Support = async(() => import("../pages/docs/Support"));
const Changelog = async(() => import("../pages/docs/Changelog"));

// Landing
const Landing = async(() => import("../pages/presentation/Landing"));

// Protected routes
const ProtectedPage = async(() => import("../pages/protected/ProtectedPage"));

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

const pagesRoutes = {
  id: "Espaces de travail",
  path: "/pages",
  icon: <Monitor />,
  children: [
    {
      path: "/pages/profile",
      name: "Direction",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Réception",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Restaurant F&B",
      component: Pricing,
    },
  ],
  component: null,
};

const pagesRoutess = {
  id: "Registres",
  path: "/pages",
  icon: <Book />,
  children: [
    {
      path: "/pages/profile",
      name: "Espace de travail",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Registre de maintenance",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Check-list",
      component: Pricing,
    },
  ],
  component: null,
};

const pagesRoutesss = {
  id: "Check-list",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Matin",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Après-midi",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Soir",
      component: Pricing,
    },
  ],
  component: null,
};

const tasksRoutes = {
  id: "Tâches",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "2",
  component: Tasks,
  children: null,
};

const ProfileRoutes = {
  id: "Mon compte",
  path: "/auth",
  icon: <Users />,
  children: null,
  component: null,
};

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
  pagesRoutes,
  pagesRoutess,
  pagesRoutesss,
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
  pagesRoutes,
  //pagesRoutess,
  //pagesRoutesss,
  //tasksRoutes,
  ProfileRoutes,
  authRoutes,
  documentationRoutes,
  changelogRoutes,
];
