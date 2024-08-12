import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

const LoginPage = () => {
    // State hooks for managing form inputs and errors
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState("");

    // Access context values and functions
    const {
        setUser,
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    // Validate the login form
    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Check if email is valid
        if (!email || !emailPattern.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Check if password is at least 6 characters long
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setReady(false);
        axios
            .post("/login", { email, password })
            .then(({ data: { message, type, user } }) => {
                // Show alert message and set user in context
                setAlertMessage(message);
                setAlertType(type);
                setUser(user);
                
                // Redirect based on user role
                if (type === "success") {
                    setTimeout(() => {
                        if (user.role === "owner") {
                            setRedirect("/dashboard");
                        } else {
                            setRedirect("/");
                        }
                    }, 1000);
                }
            })
            .catch((err) => {
                // Handle errors from the server
                let alertText =
                    "Server is not responding, refresh and try again";
                if (err.response) {
                    alertText = err.response.data.message;
                }
                setAlertMessage(alertText);
                setAlertType("error");
            })
            .finally(() => {
                setReady(true);
            });
    };

    // Redirect to a different route if needed
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-royal-blue mb-6">
                    Login
                </h2>
                <form method="post" onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value.toLowerCase())
                            }
                            required
                            className={`w-full px-4 py-2 border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            className={`w-full px-4 py-2 border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!ready}
                        style={{
                            backgroundColor: `${!ready ? "#aaa" : "#002366"}`,
                        }}
                        className="w-full px-4 py-2 text-white rounded-lg cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-royal-blue"
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-600">
                        Don&#39;t have an account?{" "}
                        <Link
                            to={"/register"}
                            className="text-royal-blue font-semibold"
                        >
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
