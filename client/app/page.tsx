"use client"
import { serverURI } from "@/utils/serverURI";
import { useUserStore } from "@/utils/states";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";

export default function Page() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();
    const setUserStore = useUserStore((state: any) => state.setUserStore)
    const router = useRouter();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        try {
            axios.post(`${serverURI}/api/auth/login`, {
                email, password
            }, { withCredentials: true }).then(res => {
                console.log(res);
                if (res.status) {
                    setUserStore({ name: res.data.user.name, email: res.data.user.email, userId: res.data.user.userId });
                    router.push(`/${res.data.user.name}`);
                }
            });
        } catch (error) {
            console.error(error);
        }

    };

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();
        try {
            axios.post(`${serverURI}/api/auth/register`, {
                email, password, name
            }).then(res => {
                if (res.status) {
                    setIsLogin(true);
                }
            });
        } catch (error) {
            console.error(error);
        }

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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {!isLogin && (
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

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