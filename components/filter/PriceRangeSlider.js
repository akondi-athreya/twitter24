'use client'
import { useEffect, useState } from "react"
import InputRange from "react-input-range"
import { useDispatch, useSelector } from "react-redux"
import { addDistance } from "../../features/filterSlice"

const PriceRangeSlider = () => {
    const { shopList } = useSelector((state) => state.filter)

    const [distance, setDistance] = useState({
        min: shopList.distance.min,
        max: shopList.distance.max,
    })

    const dispatch = useDispatch()

    // distance handler
    const handleOnChange = ({ min, max }) => {
        dispatch(addDistance({ min, max }))
    }

    useEffect(() => {
        setDistance({
            min: shopList.distance.min,
            max: shopList.distance.max,
        })
    }, [setDistance, shopList])

    return (
        <div className="range-slider-one">
            <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                maxValue={50}
                value={{ min: distance.min, max: distance.max }}
                onChange={(value) => handleOnChange(value)}
            />

            <div className="input-outer">
                <div className="amount-outer">
                    <span className="area-amount">{distance.max} KM</span>
                </div>
            </div>
        </div>
    )
}

export default PriceRangeSlider