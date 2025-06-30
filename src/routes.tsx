import { Navigate } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthGuard from "./components/auth/AuthGuard";
import {
  Login,
  Register,
  TicketList,
  TicketForm,
  ReminderSettings,
  Dashboard,
} from "./pages";

const routes = [
  {
    path: "/login",
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthGuard>
        <Register />
      </AuthGuard>
    ),
  },
  {
    index: true,
    path: "/",
    element: (
      <PrivateRoute>
        <Navigate to="/tickets" />
      </PrivateRoute>
    ),
  },
  {
    path: "/tickets",
    element: (
      <PrivateRoute>
        <TicketList />
      </PrivateRoute>
    ),
  },
  {
    path: "/tickets/new",
    element: (
      <PrivateRoute>
        <TicketForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute requireRole="agent">
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/settings/reminders",
    element: (
      <PrivateRoute requireRole="agent">
        <ReminderSettings />
      </PrivateRoute>
    ),
  },
];

export default routes;
