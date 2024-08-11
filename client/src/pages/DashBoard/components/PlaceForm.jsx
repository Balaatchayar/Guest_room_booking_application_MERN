import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { UserContext } from "../../../context/UserContextProvider";
import ImageUploader from "./ImageUploader";

const PlaceForm = () => {
    //variables to manage form data
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [minimumBooking, setMinimumBooking] = useState("");
    const [maximumBooking, setMaximumBooking] = useState("");
    const [rooms, setRooms] = useState("");
    const [beds, setBeds] = useState("");
    const [bathRooms, setBathRooms] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [redirect, setRedirect] = useState("");
    const [submitText, setSubmitText] = useState("Add");
    //  user context and other utilities
    const {
        user,
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }
        setSubmitText("Save");
        axios.get(`/places/edit/${id}`).then((response) => {
            const { data } = response;
            setName(data.name);
            setDescription(data.description);
            setPhotos(data.photos);
            setLocation(data.location);
            setPrice(data.price);
            setMinimumBooking(data.minimumBooking);
            setMaximumBooking(data.maximumBooking);
            setRooms(data.rooms);
            setBeds(data.beds);
            setBathRooms(data.bathRooms);
            setMaxGuests(data.maxGuests);
        });
    }, [id]);
// Function to handle form submission for adding or editing a place
    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // update place
            setReady(false);
            axios
                .put("/places/edit", {
                    id,
                    name,
                    description,
                    location,
                    price,
                    minimumBooking,
                    maximumBooking,
                    rooms,
                    beds,
                    bathRooms,
                    photos,
                    maxGuests,
                })
                .then((response) => {
                    const { data } = response;
                    setAlertMessage(data.message);
                    setAlertType(data.type);
                    setTimeout(() => {
                        if (data.type === "success") {
                            setRedirect("/dashboard");
                        }
                    }, 1000);
                    setReady(true);
                });
        } else {
            // create new place
            setReady(false);
            axios
                .post("/places/new", {
                    name,
                    description,
                    location,
                    price,
                    minimumBooking,
                    maximumBooking,
                    rooms,
                    beds,
                    bathRooms,
                    photos,
                    maxGuests,
                })
                .then((response) => {
                    const { data } = response;
                    setAlertMessage(data.message);
                    setAlertType(data.type);
                    setTimeout(() => {
                        if (data.type === "success") {
                            setRedirect("/dashboard");
                        }
                    }, 1000);
                    setReady(true);
                });
        }
    };

    if (ready && !user) {
        return <Navigate to="/" />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                <form
                    method="post"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {submitText} Place
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <label htmlFor="name" className="block">
                            <span className="text-gray-700">Name of the Place:</span>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your Place Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="description" className="block">
                            <span className="text-gray-700">Description:</span>
                            <input
                                id="description"
                                type="text"
                                placeholder="Enter your Place Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="location" className="block">
                            <span className="text-gray-700">Location:</span>
                            <input
                                id="location"
                                type="text"
                                placeholder="Tamil Nadu, India"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="price" className="block">
                            <span className="text-gray-700">Price:</span>
                            <input
                                id="price"
                                type="number"
                                placeholder="Enter the Price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                         {/* Minimum Booking input */}
                        <label htmlFor="minimumBooking" className="block">
                            <span className="text-gray-700">Minimum No of Booking Days:</span>
                            <input
                                id="minimumBooking"
                                type="number"
                                placeholder="Enter the Minimum Booking Days"
                                value={minimumBooking}
                                onChange={(event) => setMinimumBooking(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                             {/* Maximum Booking input */}
                        <label htmlFor="maximumBooking" className="block">
                            <span className="text-gray-700">Maximum No of Booking Days:</span>
                            <input
                                id="maximumBooking"
                                type="number"
                                placeholder="Enter the Maximum Booking Days"
                                value={maximumBooking}
                                onChange={(event) => setMaximumBooking(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="beds" className="block">
                            <span className="text-gray-700">No of Beds:</span>
                            <input
                                id="beds"
                                type="number"
                                placeholder="Enter the No of Beds"
                                value={beds}
                                onChange={(event) => setBeds(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="rooms" className="block">
                            <span className="text-gray-700">No of Rooms:</span>
                            <input
                                id="rooms"
                                type="number"
                                placeholder="Enter the No of Rooms"
                                value={rooms}
                                onChange={(event) => setRooms(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="bathrooms" className="block">
                            <span className="text-gray-700">No of Bathrooms:</span>
                            <input
                                id="bathrooms"
                                type="number"
                                placeholder="Enter the No of Bathrooms"
                                value={bathRooms}
                                onChange={(event) => setBathRooms(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                        <label htmlFor="guests" className="block">
                            <span className="text-gray-700">No of Max Guests:</span>
                            <input
                                id="guests"
                                type="number"
                                placeholder="Enter the No of Max Guests"
                                value={maxGuests}
                                onChange={(event) => setMaxGuests(event.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue-500 focus:border-royal-blue-500 sm:text-sm"
                            />
                        </label>
                    </div>
                    <div>
                        <span className="text-gray-700">Photos:</span>
                        <ImageUploader photos={photos} setPhotos={setPhotos} />
                    </div>
                    <button
                        style={{ backgroundColor: `${!ready ? "#aaa" : "#002B5B"}` }}
                        disabled={!ready}
                        className="w-full px-4 py-2 rounded-lg text-white font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-royal-blue-500"
                        type="submit"
                    >
                        {submitText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlaceForm;
