import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";
import axios from "axios";
import PlaceTile from "./components/PlaceTile";
import PlaceCardsShimmer from "./components/PlaceCardsShimmer";
import backgroundImage from "../../assets/15.jpg"; // Import the image

const HomePage = () => {
    const {
        user,
        ready,
        setReady,
        places,
        setPlaces,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    const [showPlaces, setShowPlaces] = useState(false);

    useEffect(() => {
        if (user?.role === "owner") return; // Skip fetching if the user is an owner

        if (!places) {
            setReady(false); // Set ready state to false while fetching
            axios
                .get("/places")
                .then((response) => {
                    setPlaces(response.data.places); // Set places from the response
                })
                .catch((err) => {
                    let alertText = "Server is not responding, refresh and try again";
                    if (err.response) {
                        alertText = err.response.data.message; // Handle error response
                    }
                    setAlertMessage(alertText);
                    setAlertType("error");
                })
                .finally(() => {
                    setReady(true);
                });
        }
    }, []);

    if (!ready || !places) {
        return <PlaceCardsShimmer />; // Show shimmer effect while loading
    }
    if (user?.role === "owner") {
        return <Navigate to={"/dashboard"} />; // Redirect to dashboard if the user is an owner
    }

    const handleImageClick = () => {
        setShowPlaces(true);
        document.getElementById("places-section").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            {!showPlaces && (
                <div
                    className="relative h-screen w-full"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={handleImageClick}
                            className="text-white text-3xl font-bold bg-black bg-opacity-50 px-8 py-4 rounded-lg hover:bg-opacity-75 transition-opacity duration-300"
                        >
                            Explore
                        </button>
                    </div>
                </div>
            )}

            {showPlaces && (
                <div id="places-section" className="container mx-auto px-8 py-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-8">Explore Our Places</h1>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {places?.map((place) => (
                            <div
                                key={place._id}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <PlaceTile place={place} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
