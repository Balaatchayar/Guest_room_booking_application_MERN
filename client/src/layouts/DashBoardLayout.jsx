import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import Tabs from "../pages/DashBoard/components/Tabs";
// Renders the navigation bar, tabs component, and the nested routes (outlet) in the dashboard layout
const DashBoardLayout = () => {
    return (
        <>
            <NavBar />
            <Tabs />
            <Outlet />
        </>
    );
};

export default DashBoardLayout;
