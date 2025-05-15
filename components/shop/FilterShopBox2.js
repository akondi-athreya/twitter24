'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment } from "react"
import { useDispatch } from "react-redux"
import products from "../../data/products"
// import ShopCard from "./ShopCard"
import ShopCard from "./templeShopCard"
import { useState, useEffect } from "react"
import axios from "axios"

const FilterShopBox2 = ({ itemStart, itemEnd }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    useEffect(() => {
        axios.get(baseurl + '/api/user/get/alltemple')
            .then((res) => {
                const processedData = res.data.temples.map((item) => ({
                    ...item,
                    photos: item.photos.map(photo => photo.replace('public', ''))
                }));
                setData(processedData);
            })
            .catch((error) => {
                console.error("Error fetching temples:", error)
            })
    }, [])

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }

    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    // Display all products without filtering
    let content = data.slice(0, 9)?.map((item, index) => (
        <Fragment key={index}>
            <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
        </Fragment>
    ))

    return (
        <>
            {content}
        </>
    )
}

export default FilterShopBox2
