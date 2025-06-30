import { lazy } from "react";

export const Login = lazy(() => import("../components/auth/LoginForm"));
export const Register = lazy(() => import("../components/auth/RegisterForm"));
export const TicketList = lazy(() => import("../components/tickets/TicketList"));
export const TicketForm = lazy(() => import("../components/tickets/TicketForm"));
export const ReminderSettings = lazy(() => import("../components/reminders/ReminderSettings"));

export const Dashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Agent Dashboard</h1>
    <p>Coming soon...</p>
  </div>
);
