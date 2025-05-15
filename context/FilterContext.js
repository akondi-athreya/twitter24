import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [Ourdistance, setDistance] = useState({ min: 0, max: 5 });
    const [cataList, setCataList] = useState("");

    return (
        <FilterContext.Provider value={{ Ourdistance, setDistance, cataList, setCataList }}>
            {children}
        </FilterContext.Provider>
    );
};