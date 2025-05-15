'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
    },

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.slider-pagination',
        clickable: true,
    },
}

export default function Main_slider() {
    const [isToggled, setToggled] = useState(true)
    const handleToggle = () => setToggled(!isToggled)
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);

    useEffect(() => {
        axios.get(`${baseurl}/api/user/get-all-products`)
            .then((res) => {
                console.log("API response:", res.data);
                let randomProducts = res.data.sort(() => Math.random() - Math.random()).slice(0, 4);
                console.log("Random products selected:", randomProducts);
                setProducts1(randomProducts.slice(0, 2));
                setProducts2(randomProducts.slice(2, 4));
            })
            .catch((err) => {
                console.log("API error:", err);
            })
    }, [baseurl]);
    
    return (
        <>
            <section className="slider-area slider-bg-overlay pb-30 pt-60 " data-background="assets/img/banner/banner-bg-05.jpg">
                <div className="container">
                    <div className="row justify-content-between gy-4">
                        <div className="col-xl-7 col-lg-12 justify-content-lg-center row-cols-xxl-1 row-cols-xl-1 row-cols-lg-12 row-cols-md-1 row-cols-sm-1 row-cols-1 align-items-center">
                            <div className="tp-slider-area p-relative row justify-content-xl-center">
                                <div className="swiper-container slider-active d-flex row justify-content-lg-center">
                                    <Swiper {...swiperOptions} className="d-flex justify-content-center align-items-center">
                                        <SwiperSlide>
                                            <div className="tp-slide-item tpslider-item-5">
                                                <div className="tp-slide-item__content">
                                                    <h4 className="tp-slide-item__sub-title">Skill</h4>
                                                    <h3 className="tp-slide-item__title mb-25">Get Your<br /> Skill Help.</h3>
                                                </div>
                                                <div className="tp-slide-item__img">
                                                    <img src="assets/img/slider/skill_1.jpeg" alt="Skill" loading="lazy"/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="tp-slide-item tpslider-item-5">
                                                <div className="tp-slide-item__content">
                                                    <h4 className="tp-slide-item__sub-title">Can't wait.</h4>
                                                    <h3 className="tp-slide-item__title mb-25">Pre Order &<br /> Pre Book</h3>
                                                </div>
                                                <div className="tp-slide-item__img">
                                                    <img src="assets/img/slider/prebook.jpeg" alt="prebook" loading="lazy"/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="tp-slide-item tpslider-item-5">
                                                <div className="tp-slide-item__content">
                                                    <h4 className="tp-slide-item__sub-title">Emergency</h4>
                                                    <h3 className="tp-slide-item__title mb-25">Need or<br />Seek Help.</h3>
                                                </div>
                                                <div className="tp-slide-item__img">
                                                    <img src="assets/img/slider/hospital.jpeg" alt="hospital" loading="lazy"/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="tp-slide-item tpslider-item-5">
                                                <div className="tp-slide-item__content">
                                                    <h4 className="tp-slide-item__sub-title">Your Cart Nearby.</h4>
                                                    <h3 className="tp-slide-item__title mb-25">Small Bag to<br />Big Cart.</h3>
                                                </div>
                                                <div className="tp-slide-item__img">
                                                    <img src="assets/img/slider/grocery.jpeg" alt="grocery" loading="lazy"/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="tp-slide-item tpslider-item-5">
                                                <div className="tp-slide-item__content">
                                                    <h4 className="tp-slide-item__sub-title">Fresh</h4>
                                                    <h3 className="tp-slide-item__title mb-25">Eat <br />Healty.</h3>
                                                </div>
                                                <div className="tp-slide-item__img">
                                                    <img src="assets/img/slider/vegetables.jpeg" alt="veggies" loading="lazy"/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="slider-pagination" />
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12">
                            <div className="row">
                            {products1.length > 0 ?
                                <div className="row">
                                    {products1.map((product, index) => (
                                        <div className="col-lg-6 col-md-6 col-sm-6" key={index}>
                                            <div className="tpslider-banner mb-30 tpbnner-height-5">
                                                <Link href="/products">
                                                    <div className="tpslider-banner__img tpbannerthumb-5">
                                                        <img src={`${baseurl}${product?.productImages[0]}`} alt="shop-thumb" />
                                                        <div className="tpslider-banner__content">
                                                            <span className="tpslider-banner__sub-title">{product?.StoreName}</span>
                                                            <h4 className="tpslider-banner__title">{product?.productName} <br />{product?.productCategory}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>))}
                                </div>
                                :
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="tpslider-banner white-banner mb-30 tpbnner-height-5">
                                            <Link href="/store">
                                                <div className="tpslider-banner__img tpbannerthumb-5">
                                                    <img src="assets/img/slider/slider-05-banner-2.jpg" alt="" />
                                                    <div className="tpslider-banner__content">
                                                        <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                                                        <h4 className="tpslider-banner__title">100% Fresh Product <br /> Every Hour</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="tpslider-banner white-banner mb-30 tpbnner-height-5">
                                            <Link href="/store">
                                                <div className="tpslider-banner__img tpbannerthumb-5">
                                                    <img src="assets/img/slider/slider-05-banner-2.jpg" alt="" />
                                                    <div className="tpslider-banner__content">
                                                        <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                                                        <h4 className="tpslider-banner__title">100% Fresh Product <br /> Every Hour</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            </div>
                            {products2.length > 0 ?
                                <div className="row">
                                    {products2.map((product, index) => (
                                        <div className="col-lg-6 col-md-6 col-sm-6" key={index}>
                                            <div className="tpslider-banner mb-30 tpbnner-height-5">
                                                <Link href="/products">
                                                    <div className="tpslider-banner__img tpbannerthumb-5">
                                                        <img src={`${baseurl}${product?.productImages[0]}`} alt="shop-thumb" />
                                                        <div className="tpslider-banner__content">
                                                            <span className="tpslider-banner__sub-title">{product?.StoreName}</span>
                                                            <h4 className="tpslider-banner__title">{product?.productName} <br />{product?.productCategory}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>))}
                                </div>
                                :
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="tpslider-banner white-banner mb-30 tpbnner-height-5">
                                            <Link href="/store">
                                                <div className="tpslider-banner__img tpbannerthumb-5">
                                                    <img src="assets/img/slider/slider-05-banner-2.jpg" alt="" />
                                                    <div className="tpslider-banner__content">
                                                        <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                                                        <h4 className="tpslider-banner__title">100% Fresh Product <br /> Every Hour</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="tpslider-banner white-banner mb-30 tpbnner-height-5">
                                            <Link href="/store">
                                                <div className="tpslider-banner__img tpbannerthumb-5">
                                                    <img src="assets/img/slider/slider-05-banner-2.jpg" alt="" />
                                                    <div className="tpslider-banner__content">
                                                        <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                                                        <h4 className="tpslider-banner__title">100% Fresh Product <br /> Every Hour</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row pt-60">
                        <div className="col-lg-3 col-sm-6">
                            <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                                <div className="tpservicesitem__icon mr-20">
                                    <img src="/assets/img/svg/services05.svg" alt="" className="fn__svg" loading="lazy"/>
                                </div>
                                <div className="tpservicesitem__content">
                                    <h4 className="tpservicesitem__title">Pre Orders & Bookings</h4>
                                    <p>No More Waiting</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                                <div className="tpservicesitem__icon mr-20">
                                    <img src="/assets/img/svg/services06.svg" alt="" className="fn__svg" loading="lazy"/>
                                </div>
                                <div className="tpservicesitem__content">
                                    <h4 className="tpservicesitem__title">Million Skills</h4>
                                    <p>Find Your Passion</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                                <div className="tpservicesitem__icon mr-20">
                                    <img src="/assets/img/svg/services07.svg" alt="" className="fn__svg" loading="lazy"/>
                                </div>
                                <div className="tpservicesitem__content">
                                    <h4 className="tpservicesitem__title">Secured Payments</h4>
                                    <p>We accept all major cards</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                                <div className="tpservicesitem__icon mr-20">
                                    <img src="/assets/img/svg/services08.svg" alt="" className="fn__svg" loading="lazy"/>
                                </div>
                                <div className="tpservicesitem__content">
                                    <h4 className="tpservicesitem__title">Customer Service</h4>
                                    <p>Top notch customer setvice</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}