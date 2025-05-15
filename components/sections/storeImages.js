'use client'
import Link from "next/link"
import { useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 6,
    spaceBetween: 25,
    autoplay: {
        delay: 3500,
    },
    breakpoints: {
        1400: {
            slidesPerView: 4,
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
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
}

export default function StoreImages({ storeImages }) {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    const storeImagesSlider = storeImages?.slice(1)

    return (
        <>
            <section className="shop-area pb-50">
                <div className="container">
                    <div className="shopareaitem">
                        <div className="shopslider-active swiper-container">
                            <Swiper {...swiperOptions}>
                                {storeImagesSlider && storeImagesSlider?.map((item, index) =>
                                    <SwiperSlide className="tpshopitem" key={index}>
                                        <Link className="popup-image" href={`${baseurl}/${item}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`${baseurl}/${item}`} alt="shop-thumb" />
                                        </Link>
                                    </SwiperSlide>)}
                            </Swiper>
                        </div>
                    </div>
                    {/* <div className="shopareaitem">
                        <div className="shopslider-active swiper-container">
                            <Swiper {...swiperOptions}>
                                <SwiperSlide className="tpshopitem">
                                    <Link className="popup-image" href="#">
                                        <img src="/assets/img/instagram/instagram-01.jpg" alt="shop-thumb" />
                                    </Link>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    )
}
