'use client'
import Layout from "@/components/layout/Layout"

import FilterShopBox from "@/components/shop/templeBox"
import { Suspense, useState } from "react"
import Loading from "./loading"

export default function product() {
    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Temples">
                <div className="product-area pt-70 pb-20">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="product-sidebar__product-item">
                                    <Suspense fallback={<Loading />}>
                                        <FilterShopBox />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}