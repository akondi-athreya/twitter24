"use client";
import Layout from "@/components/layout/Layout";
import FilterSidebar from "@/components/shop/FilterSidebar";
import HotDeals from "@/components/sections/hotDeals";
import { useState, useEffect } from "react";
import { FilterProvider } from "@/context/FilterContext";
import './style.css';
import dynamic from 'next/dynamic';
import Loading from './loading';
const FilterShopBox = dynamic(() => import('@/components/shop/newFilterShopBox'), {
  ssr: false,
  loading: () => <Loading />
});

export default function product() {
    const [activeIndex, setActiveIndex] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleOnClick = (index) => setActiveIndex(index);
    
    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value);
    };
    
    return (
        <FilterProvider>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Store's">
                <div className="search_box_area">
                    <input 
                        type="text" 
                        placeholder="Search Store..." 
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                </div>
                <div className="product-area pt-70 pb-20">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-md-12">
                                <div className="product-sidebar__product-item">
                                    <FilterShopBox searchTerm={searchTerm} />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-12">
                                <div className="tpsidebar product-sidebar__product-category">
                                    <FilterSidebar />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-20">
                            <HotDeals />
                        </div>
                    </div>
                </div>
            </Layout>
        </FilterProvider>
    );
}