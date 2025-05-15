// pages/reset-password/[token].js
"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import "./style.css";
import Loading from "./loading";


export default function ResetPassword() {
    const router = useParams();
    const token = router.id;
    const router1 = useRouter();

    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [passwordStrength, setPasswordStrength] = useState({
        strength: "",
        color: "",
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    useEffect(() => {
        // Check if passwords match
        if (data.confirmPassword) {
            setPasswordMatch(data.password === data.confirmPassword);
        }

        // Check password strength
        if (data.password) {
            const hasUpperCase = /[A-Z]/.test(data.password);
            const hasLowerCase = /[a-z]/.test(data.password);
            const hasNumbers = /\d/.test(data.password);
            const hasSpecialChar = /[#?!@$%^&*\-]/.test(data.password);
            const isLongEnough = data.password.length >= 8;

            const criteria = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough];
            const metCriteria = criteria.filter(Boolean).length;

            if (metCriteria <= 2) {
                setPasswordStrength({ strength: "Weak", color: "red" });
            } else if (metCriteria <= 4) {
                setPasswordStrength({ strength: "Medium", color: "orange" });
            } else {
                setPasswordStrength({ strength: "Strong", color: "green" });
            }
        } else {
            setPasswordStrength({ strength: "", color: "" });
        }
    }, [data.password, data.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (!token) {
            setError("Invalid reset token. Please try again.");
            return;
        }

        if (data.password !== data.confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        if (passwordStrength.strength !== "Strong") {
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch(`${baseurl}/api/user/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: data.password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to reset password");
            }

            setIsSubmitted(true);

            // Redirect to login after 3 seconds
            setTimeout(() => {
                router1.push("/sign-in");
            }, 3000);

        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // If no token is provided yet (during initial load)
    if (!token && typeof window !== 'undefined') {
        return (
            <Layout headerStyle={7} footerStyle={6}>
                <div className="reset-container">
                    <div className="reset-card">
                        <div className="brand-logo">
                            <h1>Twitter24.</h1>
                        </div>
                        <div className="loading-message">Loading...</div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={7} footerStyle={6}>
                    <div className="reset-container">
                        <div className="reset-card">
                            <div className="brand-logo">
                                <h1>Twitter24.</h1>
                            </div>
        
                            {!isSubmitted ? (
                                <div className="reset-content">
                                    <div className="reset-header">
                                        <h1>Reset Password</h1>
                                        <p>Create a new password for your account</p>
                                    </div>
        
                                    {error && (
                                        <div className="error-banner">
                                            <p>{error}</p>
                                        </div>
                                    )}
        
                                    <form onSubmit={handleSubmit} className="reset-form">
                                        <div className="form-group">
                                            <label htmlFor="password">New Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Enter new password"
                                                value={data.password}
                                                onChange={handleInputChange}
                                            />
                                            {data.password && (
                                                <div className="password-strength">
                                                    <span>Strength: </span>
                                                    <span
                                                        className="strength-indicator"
                                                        style={{ color: passwordStrength.color }}
                                                    >
                                                        {passwordStrength.strength}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
        
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm new password"
                                                value={data.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                            {data.confirmPassword && !passwordMatch && (
                                                <div className="password-error">Passwords do not match</div>
                                            )}
                                        </div>
        
                                        <div className="password-requirements">
                                            <p>Password must contain:</p>
                                            <ul>
                                                <li className={/[A-Z]/.test(data.password) ? "met" : ""}>
                                                    Uppercase letter
                                                </li>
                                                <li className={/[a-z]/.test(data.password) ? "met" : ""}>
                                                    Lowercase letter
                                                </li>
                                                <li className={/\d/.test(data.password) ? "met" : ""}>
                                                    Number
                                                </li>
                                                <li className={/[#?!@$%^&*\-]/.test(data.password) ? "met" : ""}>
                                                    Special character (#?!@$%^&*-)
                                                </li>
                                                <li className={data.password.length >= 8 ? "met" : ""}>
                                                    At least 8 characters
                                                </li>
                                            </ul>
                                        </div>
        
                                        <button
                                            type="submit"
                                            className="reset-button"
                                            disabled={
                                                isSubmitting ||
                                                !passwordMatch ||
                                                passwordStrength.strength !== "Strong"
                                            }
                                        >
                                            {isSubmitting ? "Resetting..." : "Reset Password"}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h2>Password Reset Successful!</h2>
                                    <p>Your password has been successfully updated.</p>
                                    <p className="instruction">
                                        You will be redirected to the login page in a few seconds.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Layout>
            </Suspense>
        </>
    );
}