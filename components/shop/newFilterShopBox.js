'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import products from "../../data/products"
import ShopCard from "./dummyShopCard"
import ShopCardList from "./newShopCardList"
import useBackendData from "@/data/backendData"
import { FilterContext } from "@/context/FilterContext";
import './style.css'
import Pagination from "../blog/Pagination";

const FilterShopBox = ({ searchTerm }) => {
    const { Ourdistance, cataList, setDistance, setCataList } = useContext(FilterContext);
    const { data, error, setData } = useBackendData();
    const [filterData, setFilterData] = useState([]);
    const { shopList, shopSort } = useSelector((state) => state.filter)

    // hooks
    const [refresh, setRefresh] = useState(false);
    const [sorterName, setSorterName] = useState("");
    const [cardsPerPage, setCardsPerPage] = useState(0);

    const {
        distance,
        category,
        color,
        brand,
    } = shopList || {}

    const { sort, perPage } = shopSort

    const dispatch = useDispatch()

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }
    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    const [userLocation, setUserLocation] = useState({
        lat: 0,
        lon: 0,
    });
    // Get user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                console.log("location denied");
                setFilterData(data);
                setRefresh(!refresh);
            }
        );
    }, [data]);


    // sort handler
    const sortHandler = (e) => {
        setSorterName(e.target.value);
        if (e.target.value === "asc") {
            data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
        }
        else {
            data.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt)
            })
        }
        setRefresh(!refresh);
    }

    // per page handler
    const perPageHandler = (e) => {
        const end = parseInt(e.target.value, 10);
        if (end === 0) {
            setCardsPerPage(data.length);
            setFilterData(data);
            setLimit(data.length);
        } else {
            setCardsPerPage(end);
            setLimit(end);
        }
        setCurrentPage(1); // Reset to the first page
        setRefresh(!refresh);
    };

    // clear all filters
    const clearAll = () => {
        setDistance({ min: 0, max: 0 });
        setCataList("");
        setRefresh(!refresh);
        // setCardsPerPage(0);
        // perPageHandler({ target: { value: 0 } });
        // clear the sort filter on data
        data.sort((a, b) => {
            return a.id - b.id
        })
    }

    useEffect(() => {
        console.log("useEffect rendered");
    }, [refresh]);

    useEffect(() => {
        setFilterData(data);
    }, [data]);

    useEffect(() => {
        if (cataList !== "All") {
            const newData = data?.filter((item) => {
                if (cataList !== "") {
                    return item.StoreCategory === cataList;
                }
                return item;
            });
            setFilterData(newData);
        }
        else {
            setFilterData(data);
        }
    }, [cataList]);

    useEffect(() => {
        const deg2rad = (deg) => deg * (Math.PI / 180);
        const getDistance = (userLocation, storeLocation) => {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(storeLocation.lat - userLocation.lat);
            const dLon = deg2rad(storeLocation.lon - userLocation.lon);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(userLocation.lat)) * Math.cos(deg2rad(storeLocation.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        if (isNaN(Ourdistance.max) || Ourdistance.max == 0) {
            setFilterData(data);
        } else if (userLocation.lat == 0 || userLocation.lon == 0) {
            setFilterData(data);
        } else if (Ourdistance.max >= 1) {
            const newData = data?.filter((item) => {
                const storeLocation = {
                    lat: item.StoreLatitude,
                    lon: item.StoreLongitude,
                };
                const distance = getDistance(userLocation, storeLocation);
                return distance <= Ourdistance.max;
            });
            setFilterData(newData);
        }
    }, [Ourdistance, userLocation, data]);


    const [currentPage, setCurrentPage] = useState(1);
    const showLimit = 30; // Number of items per page
    const paginationItem = 4; // Number of pagination items to show

    const [pagination, setPagination] = useState([]);
    const [limit, setLimit] = useState(showLimit);
    const [pages, setPages] = useState(Math.ceil(filterData?.length / limit));

    useEffect(() => {
        const createPagination = () => {
            if (filterData?.length > 0) {
                let arr = new Array(Math.ceil(filterData?.length / limit))
                    .fill()
                    .map((_, idx) => idx + 1);

                setPagination(arr);
                setPages(Math.ceil(filterData.length / limit));
            } else {
                setPagination([]);
                setPages(0);
            }
        };

        createPagination();
    }, [limit, filterData?.length]);


    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = filterData?.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / paginationItem) * paginationItem;
    let end = start + paginationItem;
    const getPaginationGroup = pagination.slice(start, end);

    const next = () => {
        if (currentPage < pages) {
            setCurrentPage((page) => page + 1);
        }
    };

    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage((page) => page - 1);
        }
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    useEffect(() => {
        if (searchTerm && searchTerm.trim() !== "") {
            const newData = data?.filter((item) => {
                return item.StoreName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.StoreCategory.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilterData(newData);
            setRefresh(!refresh);
        } else if (data) {
            setFilterData(data);
        }
    }, [searchTerm, data]);

    return (
        <>
            <div className="product-filter-content mb-40">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="product-item-count">
                            <span><b>{getPaginatedProducts?.length}</b> Item On List</span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="product-navtabs d-flex justify-content-end align-items-center">
                            <div className="tp-shop-selector">
                                {((cataList.length > 0 && cataList != "All") || Ourdistance.max >= 1 || cardsPerPage > 0) ?
                                    <button
                                        onClick={() => clearAll()}
                                        className="btn btn-danger text-nowrap me-2">
                                        Clear All
                                    </button> : <></>}

                                <select
                                    value={sorterName}
                                    className="chosen-single form-select"
                                    onChange={sortHandler}
                                    style={{ width: "100px" }}
                                >
                                    <option value="">Sort by</option>
                                    <option value="asc">Newest</option>
                                    <option value="des">Oldest</option>
                                </select>

                                <select
                                    onChange={(e) => perPageHandler(e)}
                                    className="chosen-single form-select ms-3"
                                    style={{ width: "100px" }}
                                    value={cardsPerPage}
                                >
                                    <option value={0}>All</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                </select>
                            </div>
                            <div className="tpproductnav tpnavbar product-filter-nav">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button className={activeIndex == 1 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}><i className="fal fa-list-ul" /></button>
                                        <button className={activeIndex == 2 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(2)}><i className="fal fa-th" /></button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-50">
                <div className="col-lg-12">
                    <div className="tab-content" id="nav-tabContent">
                        <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"} >
                            {data == null && <p>Loading...</p>}
                            {getPaginatedProducts?.length > 0 ? getPaginatedProducts.map((item, i) => (
                                <Fragment key={i}>
                                    <ShopCardList item={item} data={filterData} addToCart={addToCart} addToWishlist={addToWishlist} />
                                </Fragment>
                            )) : <p>No Data Available</p>}
                        </div>
                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct main_box">
                                {data == null && <p>Loading...</p>}
                                {getPaginatedProducts && getPaginatedProducts.map((item, i) => (
                                    <Fragment key={i}>
                                        <ShopCard item={item} data={filterData} index={i} addToCart={addToCart} addToWishlist={addToWishlist} />
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="centerpagination">
                {pages > 0 && (
                    <Pagination
                        getPaginationGroup={getPaginationGroup}
                        currentPage={currentPage}
                        pages={pages}
                        next={next}
                        prev={prev}
                        handleActive={handleActive}
                    />
                )}
            </div>
        </>
    )
}

export default FilterShopBox