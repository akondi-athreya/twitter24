'use client'
import { useDispatch, useSelector } from "react-redux"
import { addCategory } from "../../features/filterSlice"
import { categoryCheck } from "../../features/productSlice"
import { useEffect, useState } from "react"
import axios from "axios"

const CategoryLevel = () => {
    const { categoryList } = useSelector((state) => state.product) || {}
    const dispatch = useDispatch()
    
    const [cataList, setCataList] = useState([]);
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;


    useEffect(() => {
        axios.get(baseurl+'/api/getUniqueCategories')
        .then((res) => {
            res.data = res.data.map((item, index) => {
                return {
                    id: index,
                    name: item,
                    value: item,
                    isChecked: false
                }
            })
            setCataList(res.data);
        })
        .catch((err) => {
            console.error(err)
        })
    },[])

    // dispatch product-type
    const categoryHandler = (e, id) => {
        dispatch(addCategory(e.target.value))
        dispatch(categoryCheck(id))
        setCataList(cataList.map((item) => {
            if (item.id === id) {
                item.isChecked = !item.isChecked
            }
            return item
        }))
    }

    return (
        <>
        {/* apply loading until the data fetches in next.js */}
            {cataList.length === 0 && <p>Loading...</p>}

            {cataList?.map((item) => (
                <div className="form-check" key={item.id}>
                    <input
                        className="form-check-input"
                        id={`category${item.id}`}
                        type="checkbox"
                        value={item.value}
                        checked={item.isChecked || false}
                        onChange={(e) => categoryHandler(e, item.id)}
                    />
                    <label className="form-check-label" htmlFor={`category${item.id}`}>
                        {item.name}
                    </label>
                </div>
            ))}
        </>
    )
}

export default CategoryLevel
