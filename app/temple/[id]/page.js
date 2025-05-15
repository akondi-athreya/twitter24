"use client";
import { useState, useEffect, Suspense } from 'react';
import Layout from "@/components/layout/Layout";
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import './style.css'; // Import the external CSS file
import Loading from './loading';

export default function TempleDetails() {
    const router = useParams();
    const [templeData, setTempleData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchTempleData = async () => {
            try {
                axios.get(baseurl + '/api/user/get/temple/' + router.id)
                    .then((res) => {
                        console.log(res.data.temple);
                        res.data.temple.photos = res.data.temple.photos.map((photo) => {
                            return photo.replace("public", "");
                        });
                        res.data.temple.audio = res.data.temple.audio.map((audio) => {
                            return audio.replace("public", "");
                        });
                        setTempleData(res.data.temple);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch temple data");
                setLoading(false);
            }
        };

        fetchTempleData();
    }, [router.id]);

    useEffect(() => {
        // Fetch user data once we have the temple data
        const fetchUserData = async () => {
            if (templeData?.USERID) {
                try {
                    const response = await axios.get(baseurl + `/api/user/BUSS/getuserinfo/${templeData.USERID}`);
                    setUserData(response.data);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            }
        };

        fetchUserData();
    }, [templeData]);

    if (loading) {
        return (
            <Layout headerStyle={6} footerStyle={1}>
                <div className="container">
                    <div className="loading-message">Loading temple details...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout headerStyle={6} footerStyle={1}>
                <div className="container">
                    <div className="error-message">{error}</div>
                </div>
            </Layout>
        );
    }

    // Format the date
    const formattedDate = new Date(templeData?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={6} footerStyle={1}>
                    <div className="container123">
                        <div className="temple-card">
                            {/* Temple Header */}
                            <div className="temple-header">
                                <h1 className="temple-title">{templeData?.name}</h1>
                                <a href={templeData?.location} target="_blank" rel="noopener noreferrer" className="location-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="location-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    View Location
                                </a>
                            </div>

                            {/* Temple Images */}
                            <div className="section">
                                <h2 className="section-title">Photos</h2>
                                <div className="photo-grid">
                                    {templeData?.photos.map((photo, index) => (
                                        <div key={index} className="photo-item">
                                            <img
                                                src={`${baseurl}${photo}`}
                                                alt={`Temple photo ${index + 1}`}
                                                className="temple-photo"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Temple Audio */}
                            <div className="section audio-section">
                                <h2 className="section-title">Audio</h2>
                                <div className="audio-list">
                                    {templeData?.audio.map((audioFile, index) => (
                                        <div key={index} className="audio-item">
                                            <p className="audio-label">Audio Recording {index + 1}</p>
                                            <audio controls className="audio-player">
                                                <source src={`${baseurl}${audioFile}`} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Temple Description */}
                            <div className="section description-section">
                                <h2 className="section-title">Description</h2>
                                <p className="description-text">{templeData?.description}</p>
                            </div>

                            {/* Uploader Information */}
                            <div className="section uploader-section">
                                <h2 className="section-title">Uploaded By</h2>
                                {userData ? (
                                    <div className="uploader-info">
                                        <div className="uploader-avatar">
                                            {userData.Username.charAt(0)}
                                        </div>
                                        <div className="uploader-details">
                                            <p className="uploader-name">{userData.Username}</p>
                                            <p className="uploader-email">{userData.Email}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading user information...</p>
                                )}
                            </div>

                            {/* Metadata */}
                            <div className="metadata-section">
                                <p>Temple ID: {templeData?._id}</p>
                                <p>Uploaded on: {formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </Layout>
            </Suspense>
        </>
    );
}