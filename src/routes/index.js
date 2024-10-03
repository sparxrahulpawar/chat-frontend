import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ChatLayout from "../layout/ChatLayout";
import Message from "../pages/Message/Message";
import NotFound from "../pages/NotFound/NotFound";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />, 
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "chat", // Define the chat route
        element: <ChatLayout />, // Use ChatLayout for chat routes
        children: [
          {
            path: ":userId", // Dynamic route for user-specific messages
            element: <Message />, // Use Home component for user-specific messages
          },
        ],
      },
      {
        path: "*", // Catch-all route for unknown paths
        element: <NotFound />, // Render NotFound component for unknown routes
      },
    ],
  },
]);

export default router;
