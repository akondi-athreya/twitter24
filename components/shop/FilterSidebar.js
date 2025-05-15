import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { FilterContext } from "@/context/FilterContext";

const FilterSidebar = () => {
    const options = ["All", "1 Km", "2 Km", "3 Km", "5 Km", "10 Km", "15 Km", "20 Km", "25 Km", "30 Km", "40 Km", "50 Km"];
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const { cataList, setCataList, Ourdistance, setDistance } = useContext(FilterContext);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get(baseurl + '/api/getUniqueCategories')
            .then((res) => {
                var arr = ["All"];
                res.data.map((item, index) => {
                    arr.push(item);
                });
                setCategoryList(arr);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [baseurl, setCategoryList]);

    const handleDistanceChange = (e) => {
        const value = e.target.value;
        const maxDistance = parseInt(value.split(" ")[0]);
        setDistance({ min: 0, max: maxDistance });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCataList(value);
    }

    return (
        <div className="product-sidebar">
            <div className="product-sidebar__widget mb-30">
                <div className="product-sidebar__info product-info-list">
                    <h4 className="product-sidebar__title mb-25">Category</h4>
                    {categoryList.length > 0 ? <select className="chosen-single form-select"
                    style={{ width: "90%", padding: "5px", paddingLeft: "10px", outline: "none" }}
                    value={cataList}
                    onChange={(e) => handleCategoryChange(e)}>
                        {categoryList && categoryList.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select> : <p>~ Loading ~</p>}
                </div>
            </div>
            <div className="product-sidebar__widget mb-30">
                <div className="product-sidebar__info product-info-list">
                    <h4 className="product-sidebar__title mb-25">Distance</h4>
                    <select className="chosen-single form-select"
                    style={{ width: "90%", padding: "5px", paddingLeft: "10px", outline: "none" }}
                    value={(Ourdistance.max==0) ? "All" : Ourdistance.max+" Km"}
                    onChange={(e) => handleDistanceChange(e)}>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;