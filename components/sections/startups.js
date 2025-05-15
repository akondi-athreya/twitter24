'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { FaUserTie } from "react-icons/fa6";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        1400: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 1,
        },
        0: {
            slidesPerView: 1,
        },
    },
    // Navigation arrows
    navigation: {
        nextEl: '.tptestiarrow__nxt',
        prevEl: '.tptestiarrow__prv',
    },
}

export default function Startups() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`${baseurl}/api/user/getHighestRatedStores`)
            .then((res) => {
                console.log(res.data?.stores)
                setData(res.data?.stores?.slice(0, 11))
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <section className="testimonial-area pt-65 platinam-light pb-100"><br /><br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="tpsection mb-35">
                                <h4 className="tpsection__title">Delight Reviews</h4><br />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="tptestiarrow tp-white-testimonial d-flex align-items-center justify-content-end">
                                <div className="tptestiarrow__prv"><i class="bi bi-arrow-left-circle"></i>Prev</div>
                                <div className="tptestiarrow__nxt">Next<i class="bi bi-arrow-right-circle"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-container testi-active tp-white-testimonial">
                        <Swiper {...swiperOptions}>

                            {data?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="tptesti text-center">
                                        <div className="tptesti__icon mb-25">
                                            <img src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABcElEQVQ4jbXUPWtVQRDG8V9uJr4mSBRM4RvYJEEMiqLYhWAjCFamEVut/A52IZAyjYXmA4igRcBYCIqNFoKFkhSCVUBQQVAQTbyyYS9clj2HiDiwnGXmmf/szu6egYhQ2F5cx1VMYA8uYLUU9tkUbmIaY3hQUlPgHg5gGffxCesNwB2Yxy28xaP8XZNWnMe1iOhGxFJEjPX5m8ZQRKxExLeImC01vcnJDJ3bBrA3FiPia0SM1+K9Hj/HT1xs6WO/ncNLXMLjmiCBJ/EOZ/B6m+DUy0M42yTo4DI+/AV0Zz7kO22i1IdTucDttIMi/hvfsYTP2bcfwxl+uML8gTeRoUk4U4C7GMmFn/SBO7ngCRyp5JzG08gP4AWuVKofx/ucUO70Bl5Vcu7iYCcnDTa0aleDvy2WinY7LYn/ZP8dnA6jZr9acjca/Fus3q3Yh6MV0bEWcLpqtZzRrYeX/1zn8axhR1+KlW/iIxbyvLTdePgHAXhADHlkJs8AAAAASUVORK5CYII=" alt="" className="fn__svg" />
                                        </div>
                                        <div className="tptesti__content pb-5">
                                            <p>{item?.reviews[0]?.review}"</p>
                                            <br />
                                            <p>{item?.reviews[0]?.rating}*</p>
                                        </div>
                                        <div className="tptesti__avata d-flex align-items-center justify-content-center">
                                            <div className="tptesti__avata-icon mr-20">
                                                <FaUserTie size={40}/>
                                            </div>
                                            <div className="tptesti__avata-content text-start">
                                                <h5 className="tptesti__avata-content-title">{item?.reviews[0]?.Username}</h5>
                                                <p>{item?.reviews[0]?.StoreId}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div><br />
            </section>
        </>
    )
}
