"use client";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Import Autoplay and Pagination modules
import 'swiper/css';
import 'swiper/css/autoplay'; // Import Autoplay CSS
import 'swiper/css/pagination'; // Import Pagination CSS
import axios from "axios";

export default function Exclusive() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const titleRef = useRef(null);
    const [bannerData, setBannerData] = useState([]);
    const [premiumBannerData, setPremiumBannerData] = useState([]);

    useEffect(() => {
        gsap.registerPlugin(TextPlugin);
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                duration: 1,
                text: "Get To Know Your Local Updates..!",
                ease: "none",
            });
        }
        axios.get(baseurl + "/api/user/mylocalupates/premiumuserbanner")
            .then((res) => {
                // console.log(res.data);
                if (res.data.length < 10) {
                    setBannerData(res.data);
                    return;
                }
                let temp = [];
                for (let i = 0; i < 10; i++) {
                    temp.push(res.data[Math.floor(Math.random() * res.data.length)]);
                }
                setBannerData(temp);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(baseurl + "/api/user/get-premium-plus-banner")
            .then((res) => {
                console.log(res.data.result);
                if (res.data.result.length < 10) {
                    setPremiumBannerData(res.data.result);
                    return;
                }
                let temp = [];
                for (let i = 0; i < 10; i++) {
                    temp.push(res.data.result[Math.floor(Math.random() * res.data.result.length)]);
                }
                setPremiumBannerData(temp);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <section className="exclusive-area pb-65">
                <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", paddingTop: "50px", paddingBottom: "40px", height: "150px" }}>
                    <h2 className="title_of_page" ref={titleRef}></h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <div className="exclusiveitem banner-animation p-relative mb-30">
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    loop={true}
                                    pagination={{ clickable: true }}
                                    modules={[Autoplay, Pagination]} // Register Autoplay and Pagination modules
                                    onSwiper={(swiper) => console.log(swiper)}
                                >
                                    {
                                        bannerData?.length > 0 ? bannerData.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className="exclusiveitem__thumb" style={{ width: "100%", height: "500px", overflow: "hidden" }}>
                                                        <img src={`${baseurl}${item?.imagePath}`} alt="Promotion Banner"
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        }
                                        ) : ""
                                    }
                                    <div className="swiper-pagination"></div> {/* Add pagination element */}
                                </Swiper>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="exclusivearea banner-animation p-relative mb-30">
                                <div className="exclusivearea__thumb">
                                    {/* <img src="/assets/img/banner/banner-offer-02.jpg" alt="" /> */}
                                    <Swiper
                                        spaceBetween={50}
                                        slidesPerView={1}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        loop={true}
                                        pagination={{ clickable: true }}
                                        modules={[Autoplay, Pagination]} // Register Autoplay and Pagination modules
                                        onSwiper={(swiper) => console.log(swiper)}
                                    >
                                        {
                                            premiumBannerData?.length > 0 ? premiumBannerData.map((item, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div className="exclusiveitem__thumb">
                                                            <img src={`${baseurl}${item?.imagePath}`} alt="Premium Plus"
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            }
                                            ) : ""
                                        }
                                        <div className="swiper-pagination"></div> {/* Add pagination element */}
                                    </Swiper>
                                </div>
                                <div className="tpexclusive__contentarea text-center">
                                    <h4 className="tpexclusive__subtitle subcolor">Discount</h4>
                                    <h3 className="tpexclusive__title mb-10">50% Offer</h3>
                                    <p>New Modern Stylist Fashionable <br /> Women's Wear holder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}