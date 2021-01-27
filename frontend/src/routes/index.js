import React from "react";

import async from "../components/Async";
import Divider from "@material-ui/core/Divider";
import { Tooltip } from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  People,
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

// Components components
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));
const Formik = async(() => import("../pages/forms/Formik"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));
const Chat = async(() => import("../pages/pages/Chat"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));
const DataGrid = async(() => import("../pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

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
      guard: AuthGuard,
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
  pagesRoutess,
  pagesRoutesss,
  tasksRoutes,
  ProfileRoutes,
  authRoutes,
  documentationRoutes,
  changelogRoutes,
];
