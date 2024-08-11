import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";
import axios from "axios";
import Listings from "./components/Listings";
import { AddIcon, ListingsIcon, MenuIcon } from "./assets/SVGAssets";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import BookingsShimmer from "../AccountPage/components/BookingsShimmer";
import DashBoardShimmer from "./components/ReservationsShimmer";
import ReservationsShimmer from "./components/ReservationsShimmer";
import ListingsShimmer from "./components/ListingsShimmer";

const DashBoard = () => {
    const {
        user,
        ready,
        setReady,
        alert: { setAlertType, setAlertMessage },
    } = useContext(UserContext);
    const [redirect, setRedirect] = useState("");
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        setReady(false);
        axios.get("/listings").then((response) => {
            const { data } = response;
            setPlaces(data.places);
            setAlertMessage(data.message);
            setAlertType(data.type);
            setReady(true);
        });
    }, []);

    const addNewPlace = () => {
        setRedirect("/places/new"); // redirect path to add new place
    };

    const redirectToEditPage = (id) => {
        setRedirect("/places/edit/" + id); // redirect path to edit place
    };

    if (redirect) {
        return <Navigate to={redirect} />; // Redirect if `redirect` state is set
    }

    if (!ready) {
        return <ListingsShimmer />; // Show shimmer effect while loading data
    }

    if (ready && !user) {
        return <Navigate to={"/"} />; // Redirect to home if user is not authenticated
    }
    return (
        <div className="flex flex-col justify-center items-center mx-24 fade-in">
            <div className="px-8 mt-8 w-full justify-end">
                <button
                    onClick={() => {
                        addNewPlace();
                    }}
                    className="button ml-auto"
                >
                    <AddIcon />
                    Add a new Place
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {places?.length > 0 && (
                    <p className="text-lg font-bold text-right mt-4 mr-8">
                        Total Places: ({places?.length})
                    </p>
                )}

                <Listings
                    places={places}
                    setPlaces={setPlaces}
                    ready={ready}
                    setReady={setReady}
                    setRedirect={setRedirect}
                    redirectToEditPage={redirectToEditPage}
                />
            </div>
        </div>
    );
};

export default DashBoard;
