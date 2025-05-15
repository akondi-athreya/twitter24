"use client";
import Link from "next/link"
import { useEffect, useState } from "react";
import axios from "axios";



export default function Blog1() {
    const [data, setData] = useState([])
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const reacturl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;


    useEffect(() => {
        axios.get(`${baseurl}/api/user/getMoreReviews`)
            .then((res) => {
                // slice the data to get only 6 items
                setData(res.data.stores.slice(0, 6))
                console.log(res.data.stores)
            })
            .catch((err) => {
                console.error(err)
            })

        console.log(reacturl);
    }, []);


    return (
        <>
            <section className="blog-area pb-55">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-main-box">
                                <div className="row">
                                    <div className="col-md-12 col-12">
                                        <div className="blogheader mb-20 d-flex align-items-center justify-content-between">
                                            <div className="tpsection mb-20">
                                                <h4 className="tpsection__title">Popular Stores</h4>
                                            </div>
                                            <div className="tpallblog mb-20">
                                                <h4 className="blog-btn"><Link href="/store" target="_blank">All Stores <i className="far fa-long-arrow-right" /></Link>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        data?.length > 0 && data.map((item, index) => (
                                            <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                                <div className="blogitem mb-40">
                                                    <div className="blogitem__thumb fix mb-20">
                                                        <Link target="_blank" href={`/store/${item?._id}`}><img src={baseurl+'/'+item?.StoreImages[0]} alt="Store Image" /></Link>
                                                    </div>
                                                    <div className="blogitem__content">
                                                        <div className="blogitem__contetn-date mb-10">
                                                            <ul>
                                                                <li>
                                                                    <Link target="_blank" className="date-color" href={`/store/${item?._id}`}>{item?.StoreName}</Link>
                                                                </li>
                                                                <li>
                                                                    <Link target="_blank" href="/store">{item?.StoreCategory}</Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <h4 className="blogitem__title"><Link target="_blank" href={`/store`}>{item?.StoreEstablishedYear}</Link></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 text-md-center">
                            <div className="tpcta slider-bg text-center">
                                <h5 className="tpcta__subtitle">Let's Connect.</h5>
                                <h4 className="tpcta__title mb-30">Want to Be Partner</h4>
                                <Link target="_blank" href={reacturl}>Visit Our Page <span><i className="far fa-long-arrow-right" /></span></Link>
                                {/* <div className="tpcta__input p-relative mb-10">
                                    <form action="#">
                                        <input type="email" placeholder="Enter email address" />
                                        <span className="tpcta__input-icon"><i className="far fa-envelope" /></span>
                                        <div className="tpcta__btn banner-animation mt-10">
                                            <button>Subscribe Now <span><i className="far fa-long-arrow-right" /></span></button>
                                        </div>
                                    </form>
                                </div> */}
                                {/* <p>We will not share your email anywhere</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
