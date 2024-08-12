import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import AccountPage from "./pages/AccountPage/AccountPage";
import PlaceForm from "./pages/DashBoard/components/PlaceForm";
import PlacePage from "./pages/PlacePage/PlacePage";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Reservations from "./pages/DashBoard/components/Reservations";

// Define routes for the application
export const Router = createBrowserRouter([
    {
        path: "/", // Root path
        element: <MasterLayout />,
        children: [
            {
                path: "/", // Home page
                element: <HomePage />,
            },
            {
                path: "login", // Login page
                element: <LoginPage />,
            },
            {
                path: "register", // Register page
                element: <RegisterPage />,
            },
            {
                path: "account", // Account page
                element: <AccountPage />,
            },
        ],
    },
    {
        path: "/places", // Places section
        element: <MasterLayout />,
        children: [
            {
                path: "new", // Form to create a new place
                element: <PlaceForm />,
            },
            {
                path: "edit/:id", // Form to edit a place by ID
                element: <PlaceForm />,
            },
            {
                path: ":id", // View a place by ID
                element: <PlacePage />,
            },
        ],
    },
    {
        path: "/dashboard", // Dashboard section
        element: <DashBoardLayout />,
        children: [
            {
                path: "/", // Dashboard main page
                element: <DashBoard />,
            },
            {
                path: "reservations", // Reservations page
                element: <Reservations />,
            },
        ],
    }
]);
