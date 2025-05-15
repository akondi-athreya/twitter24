

import Layout from "@/components/layout/Layout"
import Banner1 from "@/components/sections/myLocalUpdateBanner"
import Blog1 from "@/components/sections/mylocalUpdateBlog"
import Exclusive from "@/components/sections/mylocalUpdateExclusive"
import { Suspense } from "react"
// import Brand1 from "@/components/sections/myLocalUpdateBrand"
// import Product2 from "@/components/sections/Product2"
// import Slider2 from "@/components/sections/Slider2"
// import Link from "next/link"
import Loading from "./loading"


export default function Home2() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout headerStyle={6} footerStyle={1}>
                    {/* <Slider2 /> */}
                    <Exclusive />
                    {/* <Product2 /> */}
                    <Blog1 />
                    <Banner1 />
                    {/* <Brand1 />  */}
                    {/* sponsers */}
                </Layout>
            </Suspense>
        </>
    )
}