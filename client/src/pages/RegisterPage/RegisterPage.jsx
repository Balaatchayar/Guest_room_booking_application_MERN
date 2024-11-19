import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [errors, setErrors] = useState({}); // Validation errors state

    const {
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    // Validate the form and clear resolved errors
    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required.";
        if (!email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
        if (!phone) newErrors.phone = "Phone number is required.";
        else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number is invalid.";
        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters long.";
        return newErrors;
    };

    // Clear error for specific input field
    const clearError = (field) => {
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setReady(false);
        axios
            .post("/register", { name, email, phone, password, role })
            .then((response) => {
                setAlertMessage(response.data.message);
                setAlertType(response.data.type);
            })
            .catch((err) => {
                let alertText = "Server is not responding, refresh and try again";
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-royal-blue mb-6">
                    Register
                </h2>
                <form method="post" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value.toUpperCase());
                                clearError("name");
                            }}
                            required
                            className={`w-full px-4 py-2 border ${
                                errors.name ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value.toLowerCase());
                                clearError("email");
                            }}
                            required
                            className={`w-full px-4 py-2 border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={phone}
                            onChange={(event) => {
                                setPhone(event.target.value);
                                clearError("phone");
                            }}
                            required
                            className={`w-full px-4 py-2 border ${
                                errors.phone ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <select
                            name="role"
                            onChange={(event) => setRole(event.target.value)}
                            value={role}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue"
                        >
                            <option value="customer">Customer</option>
                            <option value="owner">House Owner</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter a New Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                clearError("password");
                            }}
                            required
                            className={`w-full px-4 py-2 border ${
                                errors.password ? "border-red-500" : "border-gray-300"
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
                            backgroundColor: `${!ready ? "#aaa" : "#002366"}`, // Royal Blue
                        }}
                        className="w-full px-4 py-2 text-white rounded-lg cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-royal-blue"
                    >
                        Register
                    </button>
                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-royal-blue font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
