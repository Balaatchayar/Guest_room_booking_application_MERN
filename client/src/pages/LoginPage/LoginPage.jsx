import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const {
        setUser,
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setReady(false);
        axios
            .post("/login", {
                email,
                password,
            })
            .then(({ data: { message, type, user } }) => {
                setAlertMessage(message);
                setAlertType(type);
                setUser(user);
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

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-royal-blue mb-6">
                    Login
                </h2>
                <form
                    method="post"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value.toLowerCase())
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue"
                        />
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!ready}
                        style={{
                            backgroundColor: `${!ready ? "#aaa" : "#002366"}`, // Royal Blue
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
