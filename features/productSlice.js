import { createSlice } from "@reduxjs/toolkit"


// const initialState = {
//     latestJob: [],
//     categoryList: [
//         { id: 1, name: "Kids", value: "kids", isChecked: false, },
//         { id: 2, name: "Mens", value: "mens", isChecked: false, },
//         { id: 3, name: "Womens", value: "womens", isChecked: false, }
//     ],
//     colorList: [
//         { id: 1, name: "Black", value: "black", isChecked: false, },
//         { id: 2, name: "Blue", value: "blue", isChecked: false, },
//         { id: 3, name: "Gray", value: "gray", isChecked: false, },
//         { id: 4, name: "Green", value: "green", isChecked: false, },
//         { id: 5, name: "Red", value: "red", isChecked: false, }
//     ],
//     brandList: [
//         { id: 1, name: "Adidas", value: "adidas", isChecked: false, },
//         { id: 2, name: "Balenciaga", value: "balenciaga", isChecked: false, },
//         { id: 3, name: "Balmain", value: "balmain", isChecked: false, },
//         { id: 4, name: "Burberry", value: "burberry", isChecked: false, },
//         { id: 5, name: "Chloe", value: "chloe", isChecked: false, }
//     ]
// }

const initialState = {
    latestJob: [],
    categoryList: [
        { id: 1, name: "Grocery", value: "grocery", isChecked: false },
        { id: 2, name: "Medical", value: "medical", isChecked: false },
        { id: 3, name: "Fruits", value: "fruits", isChecked: false },
        { id: 4, name: "Vegetables", value: "vegetables", isChecked: false },
        { id: 5, name: "Clothes", value: "clothes", isChecked: false },
        { id: 6, name: "Electronics", value: "electronics", isChecked: false },
        { id: 7, name: "Books", value: "books", isChecked: false },
        { id: 8, name: "Stationery", value: "stationery", isChecked: false },
        { id: 9, name: "Furniture", value: "furniture", isChecked: false },
        { id: 10, name: "Footwear", value: "footwear", isChecked: false },
        { id: 11, name: "Cosmetics", value: "cosmetics", isChecked: false },
        { id: 12, name: "Jewelry", value: "jewelry", isChecked: false },
        { id: 13, name: "Sports", value: "sports", isChecked: false },
        { id: 14, name: "Toys", value: "toys", isChecked: false }
    ],
    // colorList: [
    //     { id: 1, name: "Black", value: "black", isChecked: false, },
    //     { id: 2, name: "Blue", value: "blue", isChecked: false, },
    //     { id: 3, name: "Gray", value: "gray", isChecked: false, },
    //     { id: 4, name: "Green", value: "green", isChecked: false, },
    //     { id: 5, name: "Red", value: "red", isChecked: false, }
    // ],
    // brandList: [
    //     { id: 1, name: "Adidas", value: "adidas", isChecked: false, },
    //     { id: 2, name: "Balenciaga", value: "balenciaga", isChecked: false, },
    //     { id: 3, name: "Balmain", value: "balmain", isChecked: false, },
    //     { id: 4, name: "Burberry", value: "burberry", isChecked: false, },
    //     { id: 5, name: "Chloe", value: "chloe", isChecked: false, }
    // ]
}


export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        clearCategoryToggle: (state) => {
            state?.categoryList?.map((item) => {
                item.isChecked = false
                return {
                    ...item,
                }
            })
        },
        categoryCheck: (state, { payload }) => {
            state?.categoryList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false
                    } else {
                        item.isChecked = true
                    }
                }
                return {
                    ...item,
                }
            })
        },

        clearColorToggle: (state) => {
            state?.colorList?.map((item) => {
                item.isChecked = false
                return {
                    ...item,
                }
            })
        },
        colorCheck: (state, { payload }) => {
            state?.colorList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false
                    } else {
                        item.isChecked = true
                    }
                }
                return {
                    ...item,
                }
            })
        },
        clearBrandToggle: (state) => {
            state?.brandList?.map((item) => {
                item.isChecked = false
                return {
                    ...item,
                }
            })
        },
        brandCheck: (state, { payload }) => {
            state?.brandList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false
                    } else {
                        item.isChecked = true
                    }
                }
                return {
                    ...item,
                }
            })
        },

    },
})

export const {
    clearCategoryToggle,
    categoryCheck,
    clearColorToggle,
    colorCheck,
    clearBrandToggle,
    brandCheck,
} = jobSlice.actions
export default jobSlice.reducer
