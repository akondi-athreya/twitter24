"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import axios from "axios"
import HoverRating from "@/components/elements/rating"
import toast, { Toaster } from "react-hot-toast"
import Rating from "@mui/material/Rating"
import "../style.css"
import { useAuth } from "@/context/AuthContext"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 5,
    spaceBetween: 25,
    autoplay: {
        delay: 3500,
    },
    breakpoints: {
        1400: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 5,
        },
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
    navigation: {
        nextEl: ".tprelated__nxt",
        prevEl: ".tprelated__prv",
    },
}

export default function ShopDetails() {
    const Router = useParams()
    const id = Router.id
    const { user, loading } = useAuth()

    const [blogPost, setBlogPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [storeData, setStoreData] = useState([])
    const [store, setStore] = useState(null)
    const [prod, setProd] = useState([])
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [review, setReview] = useState([])
    const [numberRating, setNumberRating] = useState(0)
    const [discountedItems, setDiscountedItems] = useState([])
    const [userPlan, setUserPlan] = useState([])
    const [relatedProds, setRelatedProds] = useState([])
    const [following, setFollowing] = useState(false)
    const [Imgarr, setImgarr] = useState([])

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    // Load store data
    useEffect(() => {
        axios
            .get(`${baseurl}/api/user/store/${id}`)
            .then((res) => {
                console.log(res.data)
                setStoreData(res.data)
                console.log(res.data.StoreImages)
                setImgarr(res.data.StoreImages)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, [id, refresh])

    // Set share data and get user plan
    const [shareData, setShareData] = useState(null)
    useEffect(() => {
        if (storeData) {
            const data = {
                title: "Check out this Store!",
                text: storeData.StoreName,
                url: window.location.href,
            }
            setShareData(data)
        }

        if (storeData.USERID) {
            axios
                .get(`${baseurl}/api/user/get_user_plan/${storeData.USERID}`)
                .then((res) => {
                    console.log(res.data)
                    setUserPlan(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [storeData, refresh])

    // Load store products, reviews, banner, and related products
    const [storeBanner, setStoreBanner] = useState(null)
    useEffect(() => {
        if (storeData.StoreId) {
            axios
                .get(`${baseurl}/api/user/get-store-products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setProd(res.data)
                    const discounted = res.data.filter((item) => item.onDiscount)
                    setDiscountedItems(discounted)
                })
                .catch((err) => {
                    console.log(err)
                })

            axios
                .get(`${baseurl}/api/user/getReviews/${storeData.StoreId}`)
                .then((res) => {
                    setReview(res.data.reviews)
                    if (res.data.reviews.length > 0) {
                        // calculates the average rating
                        setNumberRating(
                            Math.round(res.data.reviews.reduce((acc, curr) => acc + curr.rating, 0) / res.data.reviews.length),
                        )
                    } else {
                        setNumberRating(0)
                    }
                })
                .catch((err) => {
                    console.error(err)
                })

            axios
                .get(`${baseurl}/api/user/get-store-banner/${storeData.StoreId}`)
                .then((res) => {
                    setStoreBanner(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })

            axios
                .get(
                    `${baseurl}/api/user/get-related-category-products/${storeData?.StoreCategory?.toLowerCase()}/${storeData?.StoreId
                    }`,
                )
                .then((res) => {
                    setRelatedProds(res.data[0].results)
                })
                .catch((err) => {
                    console.error(err)
                })

                axios.post(`${baseurl}/api/user/isFollowing`, {
                    USERID: user.UserId,
                    storeId: storeData.StoreId,
                })
                .then((res) => {
                    // The logic here was inverted
                    if (res.status === 200) {
                        setFollowing(true); // If 200, user is following the store
                    } else if (res.status === 204) {
                        setFollowing(false); // If 204, user is not following
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setFollowing(false);
                });
        }
    }, [storeData.StoreId, id, refresh])


    const handleShare = async (val) => {
        if (val === "whastsapp") {
            const url = `https://api.whatsapp.com/send?text=${shareData.url}`
            window.open(url, "_blank").focus()
            return
        }
        if (val === "facebook") {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`
            window.open(url, "_blank").focus()
            return
        }
        if (navigator.share) {
            try {
                await navigator.share(shareData)
                console.log("Content shared successfully!")
            } catch (error) {
                console.error("Error sharing content:", error)
            }
        } else {
            alert("Sharing is not supported on this browser.")
        }
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating)
    }

    const handlesubmit = async (event) => {
        event.preventDefault()
        if (!user) {
            toast.error("Please login to add a review")
            return
        }

        const data = {
            StoreId: storeData.StoreId,
            Username: user?.Username,
            rating: rating,
            review: comment,
        }

        await axios
            .post(`${baseurl}/api/user/addReview`, data)
            .then((res) => {
                setRating(0)
                setComment("")
                setRefresh(!refresh)
                toast.success("Comment Added")
                handleRatingChange(0)
            })
            .catch((err) => {
                console.error(err)
                toast.error("Failed to add review")
            })
    }

    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    const [activeIndex2, setActiveIndex2] = useState(0)
    const handleOnClick2 = (index) => {
        setActiveIndex2(index)
    }

    const handleFollow = async () => {
        if (!user?.UserId || !storeData?.StoreId) {
            console.log(user, storeData);
            toast.error("Please login to follow this store")
            return
        }

        try {
            const response = await axios.post(`${baseurl}/api/user/follow`, {
                storeId: storeData.StoreId,
                USERID: user.UserId,
                username: user.Username,
            })

            console.log(response.data)
            toast.success("Following the store")
            setFollowing(true)
        } catch (err) {
            toast.error("Error following the store")
            console.error(err)
        }
    }

    const handleUnFollow = async () => {
        if (!user?.UserId || !storeData?.StoreId) {
            return
        }

        try {
            const response = await axios.post(`${baseurl}/api/user/unfollow`, {
                storeId: storeData.StoreId,
                USERID: user.UserId,
            })

            console.log(response.data)
            toast.success("Unfollowing the store")
            setFollowing(false)
        } catch (err) {
            toast.error("Error unfollowing the store")
            console.error(err)
        }
    }

    return (
        <>
            {isLoading || loading ? (
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Store Details">
                    <div className="container py-20">
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <p className="mt-3">Loading store details...</p>
                            </div>
                        </div>
                    </div>
                </Layout>
            ) : storeData ? (
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Store Details">
                    <Toaster position="top-center" reverseOrder={false} />
                    <div>
                        <section className="product-area pt-80 pb-25">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-5 col-md-12">
                                        <div className="tpproduct-details__nab pr-50 mb-40">
                                            <div className="d-flex align-items-start">
                                                <div
                                                    className="nav flex-column nav-pills me-3"
                                                    id="v-pills-tab"
                                                    role="tablist"
                                                    aria-orientation="vertical"
                                                >
                                                    {Imgarr?.length > 0 ? (
                                                        Imgarr?.map((item, index) => {
                                                            return (
                                                                <button
                                                                    key={index}
                                                                    className={activeIndex2 == index ? "nav-link active" : "nav-link"}
                                                                    onClick={() => handleOnClick2(index)}
                                                                >
                                                                    <img src={baseurl + "/" + item || "/placeholder.svg"} alt="" />
                                                                </button>
                                                            )
                                                        })
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    {Imgarr?.length > 0 ? (
                                                        Imgarr?.map((item, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className={activeIndex2 == index ? "tab-pane fade show active" : "tab-pane fade"}
                                                                >
                                                                    <img src={baseurl + "/" + item || "/placeholder.svg"} alt="" />
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-7">
                                        <div className="tpproduct-details__content">
                                            <div className="tpproduct-details__tag-area d-flex align-items-center mb-5">
                                                <span className="tpproduct-details__tag since_class">
                                                    Since{" "}
                                                    {storeData?.StoreEstablishedYear
                                                        ? storeData.StoreEstablishedYear.toString().split("-").reverse().join("-")
                                                        : "N/A"}
                                                </span>
                                                <div className="tpproduct-details__rating">
                                                    {numberRating > 0 ? (
                                                        <span>
                                                            <Link href="#">
                                                                {Array.from({ length: numberRating }, (_, index) => (
                                                                    <i key={index} className="fas fa-star" />
                                                                ))}
                                                                {Array.from({ length: 5 - numberRating }, (_, index) => (
                                                                    <i key={index} className="fal fa-star" />
                                                                ))}
                                                                {`${numberRating} Rating`}
                                                            </Link>
                                                        </span>
                                                    ) : (
                                                        <span>0 Ratings</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="tpproduct-details__title-area d-flex align-items-center flex-wrap mb-5">
                                                <h3 className="tpproduct-details__title">{storeData?.StoreName}</h3>
                                                <span className="tpproduct-details__stock">{storeData?.StoreCategory}</span>
                                            </div>
                                            <div className="tpproduct-details__pera name_number">
                                                <p>{storeData?.StoreOwnerName}</p>
                                                <p>{storeData?.StoreOwnerNumber}</p>
                                            </div>
                                            <div className="tpproduct-details__count d-flex align-items-center flex-wrap mb-25">
                                                <div>
                                                    {following ? (
                                                        <div
                                                            style={{
                                                                border: "1px solid rgb(161, 161, 161)",
                                                                borderRadius: "5px",
                                                                padding: "5px 10px",
                                                            }}
                                                        >
                                                            <button className="button" data-text="Awesome" onClick={handleUnFollow}>
                                                                <span className="actual-text">&nbsp;UnFollow&nbsp;</span>
                                                                <span aria-hidden="true" className="hover-text">
                                                                    &nbsp;UnFollow&nbsp;
                                                                </span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                border: "1px solid rgb(161, 161, 161)",
                                                                borderRadius: "5px",
                                                                padding: "5px 10px",
                                                            }}
                                                        >
                                                            <button className="button" data-text="Awesome" onClick={handleFollow}>
                                                                <span className="actual-text">&nbsp;Follow&nbsp;</span>
                                                                <span aria-hidden="true" className="hover-text">
                                                                    &nbsp;Follow&nbsp;
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="tpproduct-details__information tpproduct-details__code">
                                                <p>Store Id:</p>
                                                <span>{storeData?.StoreId}</span>
                                            </div>
                                            <div className="tpproduct-details__information tpproduct-details__categories">
                                                <p>Category:</p>
                                                <span>
                                                    <Link href="#">{storeData?.StoreCategory}</Link>
                                                </span>
                                                
                                            </div>
                                            <div className="tpproduct-details__information tpproduct-details__tags">
                                                <p>Tags:</p>

                                                {storeData?.StoreTags?.length > 0 ? (
                                                    storeData?.StoreTags?.map((item, index) => {
                                                        return (
                                                            <span key={index}>
                                                                <Link href="#">{item}</Link>
                                                                {index < storeData.StoreTags.length - 1 ? ", " : ""}
                                                            </span>
                                                        )
                                                    })
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div
                                                className="tpproduct-details__information tpproduct-details__social"
                                                style={{ display: "flex", gap: "10px" }}
                                            >
                                                <p>Share:</p>
                                                <button className="blog-d-wt" onClick={() => handleShare("whastsapp")}>
                                                    <i className="fab fa-whatsapp" />
                                                </button>
                                                <button className="blog-d-fb" href="#" onClick={() => handleShare("facebook")}>
                                                    <i className="fab fa-facebook-f" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-5">
                                        <div className="tpproduct-details__condation">
                                            <ul>
                                                {userPlan?.length > 0 && (
                                                    <li>
                                                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                                                            <div className="tpproduct-details__condation-thumb">
                                                                <img
                                                                    src="/assets/img/icon/product-det-2.png"
                                                                    alt=""
                                                                    className="tpproduct-details__img-hover"
                                                                />
                                                            </div>
                                                            <div className="tpproduct-details__condation-text">
                                                                {userPlan[0]?.plan === 'none' ? <p>Standard User.</p> : <p>{userPlan[0]?.plan}</p>}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* product-area-end */}
                        {/* product-details-area-start */}
                        <div className="product-details-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="tpproduct-details__navtab mb-60">
                                            <div className="tpproduct-details__nav mb-30">
                                                <ul className="nav nav-tabs pro-details-nav-btn" id="myTabs" role="tablist">
                                                    <li className="nav-item" onClick={() => handleOnClick(1)}>
                                                        <button className={activeIndex == 1 ? "nav-links active" : "nav-links"}>Description</button>
                                                    </li>
                                                    <li className="nav-item" onClick={() => handleOnClick(2)}>
                                                        <button className={activeIndex == 2 ? "nav-links active" : "nav-links"}>
                                                            Additional information
                                                        </button>
                                                    </li>
                                                    <li className="nav-item" onClick={() => handleOnClick(3)}>
                                                        <button className={activeIndex == 3 ? "nav-links active" : "nav-links"}>
                                                            Raise Issue ({review?.length})
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="tab-content tp-content-tab" id="myTabContent-2">
                                                <div
                                                    className={
                                                        activeIndex == 1
                                                            ? "tab-para tab-pane fade show active show_middle"
                                                            : "tab-para tab-pane fade"
                                                    }
                                                >
                                                    <div className="length_review_tab">
                                                        <p className="mb-30">{storeData?.StoreDescription}</p>
                                                        <p className="mb-30">{storeData?.StoreBusinessTech}</p>
                                                        <div className="store-location-box">
                                                            <div className="store-location-map">
                                                                <h4>Visit Store on Google Maps</h4>
                                                                {storeData?.StoreLatitude && storeData?.StoreLongitude ? (
                                                                    <iframe
                                                                        width="90%"
                                                                        height="300"
                                                                        frameBorder="0"
                                                                        style={{ border: 0 }}
                                                                        src={`https://maps.google.com/maps?q=${storeData.StoreLatitude},${storeData.StoreLongitude}&z=15&output=embed`}
                                                                        allowFullScreen
                                                                        loading="lazy"
                                                                    ></iframe>
                                                                ) : (
                                                                    <p>Location data not available</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                    <div className="product__details-info table-responsive">
                                                        <table className="table table-striped">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="add-info">Address</td>
                                                                    <td className="add-info-list">{storeData?.StoreAddress}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="add-info">Products Count</td>
                                                                    <td className="add-info-list">{prod?.length}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="add-info">On Discount</td>
                                                                    <td className="add-info-list">{discountedItems?.length}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="add-info">Pre Booking</td>
                                                                    <td className="add-info-list"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="add-info">Pre Orders</td>
                                                                    <td className="add-info-list"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className={activeIndex == 3 ? "tab-pane fade show active show_middle" : "tab-pane fade"}>
                                                    <div className="product-details-review length_review_tab">
                                                        <h3 className="tp-comments-title mb-35">
                                                            {review?.length > 0 ? review?.length : 0} reviews for "{storeData?.StoreName}"
                                                        </h3>
                                                        <div className="latest-comments mb-55 comment_box">
                                                            <ul>
                                                                {review?.length > 0 ? (
                                                                    review?.map((res, ind) => (
                                                                        <li key={ind}>
                                                                            <div className="comments-box d-flex">
                                                                                <div className="comments-text">
                                                                                    <div className="comments-top d-flex align-items-center rating_box_me">
                                                                                        <div className="avatar-name commenter_name">
                                                                                            {res.Username}
                                                                                            <div className="comments-date mb-10">
                                                                                                <span className="dateee">
                                                                                                    {new Date(res.createdAt).toLocaleDateString("en-GB")}
                                                                                                </span>
                                                                                            </div>
                                                                                            <p className="m-0" style={{ color: "black", fontSize: "18px" }}>
                                                                                                {res?.review}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="userratingnumber">
                                                                                            <Rating
                                                                                                name="half-rating-read"
                                                                                                defaultValue={res.rating}
                                                                                                precision={0.5}
                                                                                                readOnly
                                                                                                className="ratingstars"
                                                                                            />
                                                                                            {res.rating} Rating
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <p>No reviews available</p>
                                                                )}
                                                            </ul>
                                                        </div>
                                                        <div className="product-details-comment">
                                                            <div className="comment-title mb-20">
                                                                <h3>Add a review</h3>
                                                                <p>Your email address will not be published. Required fields are marked*</p>
                                                            </div>
                                                            <div className="comment-rating mb-20 d-flex">
                                                                <span style={{ marginRight: "30px" }}>Overall ratings</span>
                                                                <HoverRating onRatingChange={handleRatingChange} />
                                                            </div>
                                                            <div className="comment-input-box">
                                                                <form>
                                                                    <div className="row">
                                                                        <div className="col-xxl-12">
                                                                            <div className="comment-input">
                                                                                <textarea
                                                                                    placeholder="Type your comment*"
                                                                                    onChange={(e) => setComment(e.target.value)}
                                                                                    value={comment}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-12">
                                                                            <div className="comment-submit">
                                                                                <button onClick={handlesubmit} className="tp-btn pro-submit">
                                                                                    Submit
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* product-details-area-end */}
                        {/* related-product-area-start */}
                        <div className="related-product-area pt-65 pb-50 related-product-border">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-sm-6">
                                        <div className="tpsection mb-40">
                                            <h4 className="tpsection__title">Store Products</h4>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="tprelated__arrow d-flex align-items-center justify-content-end mb-40">
                                            <div className="tprelated__prv">
                                                <i className="far fa-long-arrow-left" />
                                            </div>
                                            <div className="tprelated__nxt">
                                                <i className="far fa-long-arrow-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-container related-product-active">
                                    <Swiper {...swiperOptions}>
                                        {prod.length > 0 ? (
                                            prod.map((res, ind) => (
                                                <SwiperSlide key={ind}>
                                                    <div className="tpproduct pb-15 mb-30">
                                                        <div className="tpproduct__thumb p-relative">
                                                            <Link href="/products">
                                                                <img src={`${baseurl}${res.productImages[0]}`} alt="blog-sidebar" />
                                                                <img
                                                                    className="product-thumb-secondary"
                                                                    src={`${baseurl}${res.productImages[1]}`}
                                                                    alt="blog-sidebar"
                                                                />
                                                            </Link>
                                                            
                                                        </div>
                                                        <div className="tpproduct__content">
                                                            <h3 className="tpproduct__title">
                                                                <Link href="/products">{res.productName}</Link>
                                                            </h3>
                                                            <div className="tpproduct__price">
                                                                <span>₹{res.productPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <p>No products have been uploaded for this store</p>
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        {/* Related category products */}
                        <div className="related-product-area pt-20 pb-50 related-product-border">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-sm-6">
                                        <div className="tpsection mb-40">
                                            <h4 className="tpsection__title">Related Category Products</h4>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="tprelated__arrow d-flex align-items-center justify-content-end mb-40">
                                            <div className="tprelated__prv">
                                                <i className="far fa-long-arrow-left" />
                                            </div>
                                            <div className="tprelated__nxt">
                                                <i className="far fa-long-arrow-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-container related-product-active">
                                    <Swiper {...swiperOptions}>
                                        {relatedProds.length > 0 ? (
                                            relatedProds.map((res, ind) => (
                                                <SwiperSlide key={ind}>
                                                    <div className="tpproduct pb-15 mb-30">
                                                        <div className="tpproduct__thumb p-relative">
                                                            <Link href="/products">
                                                                <img src={`${baseurl}${res.productImages[0]}`} alt="blog-sidebar" />
                                                                <img
                                                                    className="product-thumb-secondary"
                                                                    src={`${baseurl}${res.productImages[1]}`}
                                                                    alt="blog-sidebar"
                                                                />
                                                            </Link>
                                                            
                                                        </div>
                                                        <div className="tpproduct__content">
                                                            <h3 className="tpproduct__title">
                                                                <Link href="/products">{res.productName}</Link>
                                                            </h3>
                                                            <div className="tpproduct__price">
                                                                <span>₹{res.productPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <p>No related products found</p>
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            ) : (
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Store Details">
                    <div className="container py-20">
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <div className="text-center">
                                <p>Store not found.</p>
                            </div>
                        </div>
                    </div>
                </Layout>
            )}
        </>
    )
}

