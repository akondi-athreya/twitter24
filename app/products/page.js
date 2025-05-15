'use client'
import Layout from "@/components/layout/Layout"
// import FilterShopBox from "@/components/shop/FilterShopBox"
// import FilterShopBox from "@/components/shop/newFilterShopBox"
import FilterShopBox from "@/components/shop/productBox"
import FilterSidebar from "@/components/shop/FilterSidebar"
import HotDeals from "@/components/sections/hotDeals"
import { Suspense, useState } from "react"
import Loading from "./loading"

export default function product() {
    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Products">
                    <div className="product-area pt-70 pb-20">
                        <div className="container">
                            <div className="row">
                                <HotDeals />
                                <div className="col-lg-12 col-md-12">
                                    <div className="product-sidebar__product-item">
                                        <FilterShopBox itemStart={10} itemEnd={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </Suspense>
        </>
    )
}