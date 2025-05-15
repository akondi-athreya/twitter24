import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopList: {
        distance: { min: 0, max: 50 },
        category: [],
        color: [],
        brand: [],
    },
    shopSort: {
        sort: "",
        perPage: { start: 0, end: 0 },
    },
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addDistance: (state, action) => {
            state.shopList.distance = action.payload;
        },
        addPerPage: (state, action) => {
            state.shopSort.perPage = action.payload;
        },
        addSort: (state, action) => {
            state.shopSort.sort = action.payload;
        },
        clearBrand: (state) => {
            state.shopList.brand = [];
        },
        clearCategory: (state) => {
            state.shopList.category = [];
        },
        clearColor: (state) => {
            state.shopList.color = [];
        },
    },
});

export const {
    addDistance,
    addPerPage,
    addSort,
    clearBrand,
    clearCategory,
    clearColor,
} = filterSlice.actions;

export default filterSlice.reducer;