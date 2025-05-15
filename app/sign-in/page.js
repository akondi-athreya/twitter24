"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import axios from "axios"
import { Suspense, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useAuth } from "@/context/AuthContext"
import Loading from "./loading"


export default function SignIn() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            toast.error("Please fill all fields")
            return
        }
        handleOpen()
        toast.promise(axios.post(baseurl + "/api/user/auth/login", { email, password }), {
            loading: "Logging in...",
            success: (res) => {
                if (res.status == 400) {
                    toast.success("User Not Found")
                    return
                }
                toast.success("Login successful")

                // Use the login function from AuthContext
                login(res.data.userData)

                setTimeout(() => {
                    handleClose()
                    setEmail("")
                    setPassword("")
                    window.location.href = "/"
                }, 3000)
            },
            error: (err) => {
                handleClose()
                if (err.response.status === 401) {
                    toast.error("Invalid email or password")
                } else {
                    toast.error("An error occured")
                }
            },
        })
    }

    return (
        <>
            <Toaster />
            <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Sign In" onLoginPage={true}>
                    <section className="track-area pt-80 pb-40">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-sm-12">
                                    <div className="tptrack__product mb-40" style={{ border: "1px solid black", borderRadius: "10px" }}>
                                        <div
                                            className="tptrack__thumb"
                                            style={{
                                                height: "200px",
                                                overflow: "hidden",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img src="/assets/img/banner/ssspiral.svg" alt="login" />
                                        </div>
                                        <div className="tptrack__content grey-bg-3">
                                            <div className="tptrack__item d-flex mb-20">
                                                <div className="tptrack__item-icon">
                                                    <img src="/assets/img/icon/lock.png" alt="" />
                                                </div>
                                                <div className="tptrack__item-content">
                                                    <h4
                                                        className="tptrack__item-title"
                                                        style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                    >
                                                        Login Here
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="tptrack__id mb-10">
                                                <form onSubmit={(e) => handleLogin(e)}>
                                                    <div style={{ position: "relative" }} className="tptrack__email mb-10">
                                                        <span>
                                                            <i className="fal fa-user" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            placeholder="Username / Email address"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email}
                                                        />
                                                    </div>
                                                    <div className="tptrack__email mb-10 mt-15" style={{ position: "relative" }} >
                                                        <span>
                                                            <i className="fal fa-key" />
                                                        </span>
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            id="password"
                                                            value={password}
                                                        />
                                                        <span
                                                            onClick={() => {
                                                                const passwordField = document.getElementById("password")
                                                                if (passwordField.type === "password") {
                                                                    passwordField.type = "text"
                                                                } else {
                                                                    passwordField.type = "password"
                                                                }
                                                            }}
                                                            style={{ cursor: "pointer", marginLeft: "85%" }}
                                                        >
                                                            <i className="fal fa-eye"></i>
                                                        </span>
                                                    </div>
                                                    <div className="tpsign__remember mb-15">
                                                        <div className="tpsign__pass d-flex align-items-center justify-content-between">
                                                            <Link href="/sign-up">Create Account</Link>
                                                            <Link href="/forgot-password">Forget Password</Link>
                                                        </div>
                                                    </div>
                                                    <div className="tptrack__btn">
                                                        <button type="submit" className="tptrack__submition">
                                                            Login Now
                                                            <i className="fal fa-long-arrow-right" />
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="tpsign__remember mb-15">
                                                <div className="tpsign__pass d-flex align-items-center justify-content-between">
                                                    <Link href="/sign-up">Create Account</Link>
                                                    <Link href="/forgot-password">Forget Password</Link>
                                                </div>
                                            </div>
                                            <div className="tptrack__btn">
                                                <button className="tptrack__submition" onClick={(e) => handleLogin(e)}>
                                                    Login Now
                                                    <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div> */}
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

