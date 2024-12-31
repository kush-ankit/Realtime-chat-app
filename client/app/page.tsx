"use client"
import { FormEvent, useState } from "react";

export default function Page() {

    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // Add login logic here
        alert("Logged in successfully!");
    };

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();
        // Add registration logic here
        alert("Registered successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-4">
                    {isLogin ? "Welcome Back!" : "Create an Account"}
                </h2>
                <p className="text-sm text-center text-gray-400 mb-6">
                    {isLogin
                        ? "Login to your account to continue."
                        : "Join us to explore amazing features."}
                </p>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold rounded-lg shadow-md transition duration-300"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        onClick={toggleForm}
                        className="text-purple-500 font-semibold cursor-pointer hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};