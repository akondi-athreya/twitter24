'use client'
import Link from "next/link"
import { use, useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import axios from "axios"


const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 6,
    spaceBetween: 25,
    autoplay: {
        delay: 3500,
    },
    breakpoints: {
        1400: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
}

export default function HotDeals() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const [products, setProducts] = useState([]);

    useState(() => {
        axios.get(`${baseurl}/api/user/get-all-products`)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <section className="shop-area pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tpsectionarea text-center mb-35">
                                <h2 className="tpsectionarea">Hot Deals - Huge Discounts</h2>
                                <h4 className="tpsectionarea__subtitle">Grab the Deal Now !</h4>
                            </div>
                        </div>
                    </div>
                    <div className="shopareaitem">
                        <div className="shopslider-active swiper-container">
                            <Swiper {...swiperOptions}>
                                {
                                    products?.length > 0 && products.map((product, index) => (
                                        <SwiperSlide className="tpshopitem" key={index}>
                                            <Link className="popup-image" href={`/store/${product?.storeDetails?._id}`} target="_blank">
                                                <img src={`${baseurl}${product?.productImages[0]}`} alt="shop-thumb" />
                                            </Link>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
