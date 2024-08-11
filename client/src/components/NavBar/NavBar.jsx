import { BrandLogo, MenuIcon, ProfileIcon } from "./assets/svgAssets.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

const NavBar = () => {
    const { user } = useContext(UserContext);// `UserContext` to access the current user state

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-md">
            <Link to="/" className="flex items-center space-x-3">
                <BrandLogo className="w-12 h-12" />
                <p className="text-2xl font-semibold text-gray-800">
                    Guest Room Booking Application
                </p>
            </Link>
            <nav>
                {user ? (// Renders a navigation link to the user account page if the user is logged in
                    <Link to="/account"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ProfileIcon className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">{user.name}</span>
                    </Link>
                ) : (//it will  Displays a login/register link if the user is not logged in
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        Login / Register
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default NavBar;
