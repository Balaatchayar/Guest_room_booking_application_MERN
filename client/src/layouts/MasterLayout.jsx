import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
// Renders the navigation bar, and the nested routes (outlet) 
const MasterLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default MasterLayout;
