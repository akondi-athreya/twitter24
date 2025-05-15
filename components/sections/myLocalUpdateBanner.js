"use client";
import Link from "next/link"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Banner1() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        axios.get(baseurl + '/api/user/storeData')
            .then((res) => {
                // sort by date (newewst first)
                res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                // slice to get the first 8
                setStoreData(res.data.slice(0, 8));
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);


    return (
        <>
            <div><h1 style={{paddingLeft: "50px"}} id="h1_tag">Latest Stores</h1></div>
            <section className="banner-area pt-10 pb-95">
                <div className="container">
                    <div className="row g-1">
                        {
                            storeData?.length > 0 && storeData.map((item, index) => {
                                return (
                                    <div className="col-lg-3 col-md-3" key={index}>
                                        <div className="banneritem__thumb banner-animation text-center p-relative" style={{ height: '300px', width: '100%' }}>
                                            <img src={baseurl+'/'+item?.StoreImages[0]} alt="Store Image" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                            <div className="banneritem__content">
                                                <Link target="_blank" href="/store"><i className="far fa-long-arrow-right" /></Link>
                                                <p>{item?.StoreId}</p>
                                                <h4 className="banneritem__content-tiele"><Link target="_blank" href="/store">{item?.StoreName}</Link></h4>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
