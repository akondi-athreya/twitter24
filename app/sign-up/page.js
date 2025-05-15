"use client"
import Layout from "@/components/layout/Layout"
import { useState } from "react"
import Link from "next/link"
import OtpInput from "react-otp-input"
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useAuth } from "@/context/AuthContext"
import Loading from "./loading"
import { Suspense } from "react"

export default function SignUp() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passStrength, setPassStrength] = useState(false)
    const [otp, setOtp] = useState("")
    const [hideOtp, setHideOtp] = useState(false)
    const [userName, setUserName] = useState("")

    const [incorrectMail, setIncorrectMail] = useState(false)
    const [canSend, setCanSend] = useState(false)

    const [otpVerified, setOtpVerified] = useState(false)

    const [open, setOpen] = useState(false)
    const { login } = useAuth()

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const [emailInputTimer, setEmailInputTimer] = useState(null)

    const handleEmailChange = (value) => {
        // Always update the email state first
        setEmail(value)
        
        // Clear validation states if empty
        if (value === "") {
            setIncorrectMail(false)
            setCanSend(false)
            return
        }
        setOtpVerified(false)

        // Clear any existing timers
        if (emailInputTimer) {
            clearTimeout(emailInputTimer)
        }

        // Set a new timer for validation after typing stops
        const timer = setTimeout(() => {
            validateEmail(value)
        }, 1000) // 1 second delay

        setEmailInputTimer(timer)
    }

    const validateEmail = (value) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

        if (emailRegex.test(value)) {
            setIncorrectMail(false)
            setCanSend(true)
        } else {
            // Only show error if it seems like a complete email attempt
            if (value.includes('@')) {
                setIncorrectMail(true)
            } else {
                setIncorrectMail(false)
            }
            setCanSend(false)
        }
    }

    const handleEmailBlur = () => {
        validateEmail(email)
    }

    const SendOtp = async (e) => {
        e.preventDefault()
        setHideOtp(true)
        toast.promise(axios.post(baseurl + "/api/user/auth/send-otp", { email }), {
            loading: "Sending OTP...",
            success: (res) => {
                if (res.status === 200) {
                    toast.success("OTP sent successfully")
                } else {
                    setHideOtp(false)
                    toast.error("Failed to send OTP")
                }
            },
            error: (err) => {
                setHideOtp(false)
                toast.error("Failed to send OTP")
            },
        })
    }

    const handleOtpChange = async (value) => {
        setOtp(value)
        if (value.length === 6) {
            try {
                toast.promise(axios.post(baseurl + "/api/user/auth/verify-otp", { email, otp: value }), {
                    loading: "Verifying OTP...",
                    success: (res) => {
                        if (res.status === 200) {
                            toast.success("OTP verified successfully")
                            setOtpVerified(true)
                            setHideOtp(false)
                        } else if (res.status === 400) {
                            toast.error("OTP Expired")
                        } else if (res.status === 401) {
                            toast.error("Invalid OTP")
                        } else {
                            toast.error("Failed to verify OTP")
                        }
                    },
                    error: (err) => {
                        toast.error("Failed to verify OTP")
                    },
                })
            } catch (err) {
                console.error(err)
                toast.error("Internal Server Error")
            }
        }
    }

    const handlePasswordChange = (value) => {
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (value === "") {
            setPassword("")
            return
        }
        setPassword(value)
        if (passwordRegex.test(value)) {
            setPassStrength(true)
        } else {
            setPassStrength(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault() // This ensures the form doesn't reload the page

        if (email === "" || password === "" || userName === "") {
            toast.error("Please fill all the fields")
            return
        }
        if (!passStrength) {
            toast.error(
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
            )
            return
        }
        if (!otpVerified) {
            toast.error("Please verify your email with OTP")
            return
        }
        try {
            toast.promise(axios.post(baseurl + "/api/user/auth/register", { email, userName, password }), {
                loading: "Registering...",
                success: (res) => {
                    if (res.status === 200) {
                        // Use the login function from AuthContext
                        login(res.data.userData)

                        handleOpen()
                        toast.success("Registered successfully")
                        setTimeout(() => {
                            handleClose()
                            window.location.href = "/"
                        }, 5000)
                    } else if (res.status === 400) {
                        toast.error("User already exists")
                    } else {
                        toast.error("Failed to register")
                    }
                },
                error: (err) => {
                    toast.error("Failed to register")
                },
            })
        } catch (err) {
            console.error(err)
            toast.error("Internal Server Error")
        }
    }

    return (
        <>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: "1.2rem",
                    },
                    success: {
                        style: {
                            background: "#80ed99",
                            color: "black",
                        },
                    },
                    error: {
                        style: {
                            background: "#ffb950",
                            color: "black",
                        },
                    },
                }}
            />
            <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Sign Up" onLoginPage={true}>
                    <section className="track-area pt-80 pb-40">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-sm-12">
                                    <div className="tptrack__product mb-40">
                                        <div className="tptrack__thumb" style={{ height: "200px", width: "100%", overflow: "hidden" }}>
                                            <img src="/assets/img/banner/mmmotif.svg" alt="Sign Up" />
                                        </div>
                                        <div className="tptrack__content grey-bg-3">
                                            <div className="tptrack__item d-flex mb-20">
                                                <div className="tptrack__item-icon">
                                                    <img src="/assets/img/icon/sign-up.png" alt="" />
                                                </div>
                                                <div className="tptrack__item-content">
                                                    <h4 className="tptrack__item-title">Sign Up</h4>
                                                    <p>
                                                        Your personal data will be used to support your experience throughout this website, to
                                                        manage access to your account.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tptrack__id mb-10">
                                                <form action="#" onSubmit={(e) => e.preventDefault()}>
                                                    <span>
                                                        <i className="fal fa-envelope" />
                                                    </span>
                                                    <input
                                                        type="email"
                                                        placeholder="Email address"
                                                        onChange={(e) => handleEmailChange(e.target.value)}
                                                        onBlur={handleEmailBlur}
                                                        disabled={hideOtp || otpVerified}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                if (canSend) SendOtp(e);
                                                            }
                                                        }}
                                                    />
                                                </form>
                                                {incorrectMail && <p style={{ color: "red", marginLeft: "50px" }}>Incorrect email format</p>}
                                                {canSend && !hideOtp && !otpVerified && (
                                                    <div style={{ textAlign: "right", marginTop: "10px" }}>
                                                        <button
                                                            className="tptrack__submition tpsign__reg"
                                                            style={{
                                                                cursor: "pointer",
                                                                padding: "10px 15px",
                                                                fontSize: "14px",
                                                                whiteSpace: "nowrap",
                                                                height: "fit-content"
                                                            }}
                                                            onClick={(e) => SendOtp(e)}
                                                        >
                                                            Send OTP
                                                            <i className="fal fa-long-arrow-right ml-1" />
                                                        </button>
                                                    </div>
                                                )}
                                                {otpVerified && (
                                                    <div style={{ textAlign: "right", marginTop: "10px" }}>
                                                        <span style={{ color: "green", fontSize: "14px" }}>
                                                            <i className="fas fa-check-circle mr-1"></i> Email verified
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {hideOtp && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginBottom: "20px",
                                                        paddingInline: "10px",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <p style={{ fontSize: "14px", marginBottom: "10px" }}>Enter the OTP sent to your email</p>
                                                    <OtpInput
                                                        value={otp}
                                                        onChange={(e) => handleOtpChange(e)}
                                                        numInputs={6}
                                                        renderSeparator={<span></span>}
                                                        renderInput={(props) => (
                                                            <input
                                                                {...props}
                                                                style={{
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    textAlign: "center",
                                                                    marginInline: "2px",
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <button
                                                        className="tptrack__submition tpsign__reg"
                                                        style={{
                                                            width: "fit-content",
                                                            cursor: "pointer",
                                                            padding: "8px 15px",
                                                            marginTop: "10px",
                                                            fontSize: "14px"
                                                        }}
                                                        onClick={(e) => SendOtp(e)}
                                                    >
                                                        Resend OTP
                                                        <i className="fal fa-long-arrow-right ml-1" />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="tptrack__email mb-10">
                                                <form action="#" onSubmit={(e) => e.preventDefault()}>
                                                    <span>
                                                        <i className="fal fa-user" />
                                                    </span>
                                                    <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                                                </form>
                                            </div>
                                            <div className="tptrack__email mb-10">
                                                <form action="#" onSubmit={(e) => e.preventDefault()}>
                                                    <span>
                                                        <i className="fal fa-key" />
                                                    </span>
                                                    <input
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                                    />
                                                    {password === "" ? (
                                                        ""
                                                    ) : passStrength ? (
                                                        ""
                                                    ) : (
                                                        <p style={{ color: "red", marginLeft: "50px", fontSize: "12px" }}>
                                                            must contain at least 8 characters, one uppercase, one lowercase, one number and one
                                                            special character
                                                        </p>
                                                    )}
                                                </form>
                                            </div>
                                            <div className="tpsign__account">
                                                <Link href="/sign-in">Already Have Account?</Link>
                                            </div>
                                            <div className="tptrack__btn">
                                                <button className="tptrack__submition tpsign__reg" onClick={(e) => handleRegister(e)}>
                                                    Register Now
                                                    <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            </Suspense>
        </>
    )
}