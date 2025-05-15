"use client"

import Layout from "@/components/layout/Layout"
import { useState, useEffect, Suspense } from "react"
import "./style.css"
import Loading from "./loading"

export default function Profile() {
    const [isLoaded, setIsLoaded] = useState(false)
    // const [userData] = useState({
    //     username: "Sarah Johnson",
    //     userid: "sarah_j123",
    //     email: "sarah.johnson@example.com",
    // })
    const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("twitter24user")) : {}

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Profile">
                    <section className="track-area">
                        <div className="container">
                            <div className="profile-container">
                                {/* Animated profile card with peaceful theme */}
                                <div className={`profile-card ${isLoaded ? "loaded" : ""}`}>
                                    {/* Top decorative wave pattern */}
                                    <div className="profile-header">
                                        <svg className="wave-pattern" viewBox="0 0 1440 100" preserveAspectRatio="none">
                                            <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
                                        </svg>
                                    </div>

                                    {/* Profile content */}
                                    <div className="profile-content">
                                        {/* Profile avatar */}
                                        <div className={`profile-avatar ${isLoaded ? "loaded" : ""}`}>
                                            <div className="avatar-inner">
                                                <span>{userData.Username?.charAt(0)}</span>
                                            </div>
                                            <div className="status-badge">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                                    <path d="M5 3v4" />
                                                    <path d="M19 17v4" />
                                                    <path d="M3 5h4" />
                                                    <path d="M17 19h4" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* User info */}
                                        <div className="user-info">
                                            <h1 className={`username ${isLoaded ? "loaded" : ""}`}>{userData.Username}</h1>
                                            <p className={`user-title ${isLoaded ? "loaded" : ""}`}>Personal Profile</p>
                                        </div>

                                        {/* User details cards */}
                                        <div className="user-details">
                                            {/* Username card */}
                                            <div className={`detail-card username-card ${isLoaded ? "loaded" : ""}`}>
                                                <div className="card-header">
                                                    <div className="icon-circle">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </div>
                                                    <h3>Username</h3>
                                                </div>
                                                <p className="detail-value">{userData.Username}</p>
                                            </div>

                                            {/* UserID card */}
                                            <div className={`detail-card userid-card ${isLoaded ? "loaded" : ""}`}>
                                                <div className="card-header">
                                                    <div className="icon-circle">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4" />
                                                            <path d="M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4" />
                                                            <path d="M21 15H3" />
                                                            <path d="M9 15v6" />
                                                            <path d="M15 15v6" />
                                                        </svg>
                                                    </div>
                                                    <h3>User ID</h3>
                                                </div>
                                                <p className="detail-value">{userData.UserId}</p>
                                            </div>

                                            {/* Email card */}
                                            <div className={`detail-card email-card ${isLoaded ? "loaded" : ""}`}>
                                                <div className="card-header">
                                                    <div className="icon-circle">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                        </svg>
                                                    </div>
                                                    <h3>Email</h3>
                                                </div>
                                                <p className="detail-value">{userData.EmailId}</p>
                                            </div>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="decorative-circle circle-1"></div>
                                        <div className="decorative-circle circle-2"></div>
                                    </div>

                                    {/* Bottom decorative pattern */}
                                    <div className="profile-footer"></div>
                                </div>

                                {/* Additional peaceful quote */}
                                <div className={`peaceful-quote ${isLoaded ? "loaded" : ""}`}>
                                    "Peace comes from within. Do not seek it without."
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            </Suspense>
        </>
    )
}

