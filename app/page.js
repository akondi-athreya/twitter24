import Layout from "@/components/layout/Layout"
import { Suspense } from "react"
import Loading from "./loading"
import dynamic from 'next/dynamic'

// Dynamic imports with suspense
const Main_slider = dynamic(() => import('@/components/sections/main_slider'), { suspense: true })
const Book_A_Slot = dynamic(() => import('@/components/sections/main_book_a_slot'), { suspense: true })
const Visiting_Places = dynamic(() => import('@/components/sections/visiting_places'), { suspense: true })
const DealProduct4 = dynamic(() => import('@/components/sections/DealProduct4'), { suspense: true })
const Startups = dynamic(() => import('@/components/sections/startups'), { suspense: true })

// Make the Server Component async to trigger suspense properly
export default async function Main_Home() {
    return (
        <Layout headerStyle={6} footerStyle={1}>
            <Suspense fallback={<Loading />}>
                <Main_slider />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Book_A_Slot />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Visiting_Places />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <DealProduct4 />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Startups />
            </Suspense>
        </Layout>
    )
}