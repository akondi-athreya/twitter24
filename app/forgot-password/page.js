"use client";
import Layout from "@/components/layout/Layout";
import { Suspense, useState } from "react";
import "./style.css";
import {toast, Toaster} from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function ForgotPassword() {
    const router = useRouter();
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (email) => {
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            return "Email is required";
        }
        if (!mailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError(validateEmail(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateEmail(email);
        setEmailError(error);

        if (error) return;

        setIsSubmitting(true);

        try {
            await axios.post(baseurl+'/api/user/auth/forgot-password', {email})
            .then((res) => {
                console.log(res.data);
                if(res.status === 200) toast.success('Password reset link sent to your email.');
                else if(res.status === 404) toast.error('Email not found.');
                else toast.error('An error occurred. Please try again.');
            })
            .catch((err) => {
                console.error(err);
            })
            setTimeout(() => {
                setIsSubmitted(true);
                setIsSubmitting(false);
            }, 1500);

        } catch (error) {
            setEmailError("An error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={7} footerStyle={6}>
                    <Toaster />
                    <div className="forgot-container">
                        <div className="forgot-card">
                            <div className="brand-logo">
                                <h1>Twitter24.</h1>
                            </div>
        
                            {!isSubmitted ? (
                                <div className="forgot-content">
                                    <div className="forgot-header">
                                        <h1>Forgot Password</h1>
                                        <p>
                                            Enter your email address below and we'll send you a link to reset your password.
                                        </p>
                                    </div>
        
                                    <form onSubmit={handleSubmit} className="forgot-form">
                                        <div className="form-field">
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => handleEmailChange(e.target.value)}
                                                className={emailError ? "error-input" : ""}
                                            />
                                            {emailError && <p className="error-message">{emailError}</p>}
                                        </div>
        
                                        <button
                                            type="submit"
                                            className="submit-button"
                                            disabled={isSubmitting || emailError}
                                        >
                                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                                        </button>
                                    </form>
        
                                    <p className="login-link">
                                        Remember your password? <a href="/sign-in">Sign In</a>
                                    </p>
                                </div>
                            ) : (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h2>Check Your Email</h2>
                                    <p>
                                        We've sent a password reset link to <strong>{email}</strong>
                                    </p>
                                    <p className="instruction">
                                        Please check your inbox and follow the instructions to reset your password.
                                    </p>
                                    <p className="note">
                                        If you don't see the email, check your spam folder.
                                    </p>
                                    <button
                                        className="back-button"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            router.push("/sign-in");
                                        }}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Layout>
            </Suspense>
        </>
    );
}