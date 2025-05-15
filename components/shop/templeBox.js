"use client"
import { Fragment, useState, useEffect } from "react"
import ShopCard from "./templeShopCard"
import Pagination from "../blog/Pagination"
import "./style.css"

const FilterShopBox = ({ searchRef }) => {
    // State for temple data
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterData, setFilterData] = useState([])

    // UI state
    const [activeIndex, setActiveIndex] = useState(2)
    const [sorterName, setSorterName] = useState("")
    const [cardsPerPage, setCardsPerPage] = useState(12)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState([])
    const [limit, setLimit] = useState(12)
    const [pages, setPages] = useState(0)
    const paginationItem = 4 // Number of pagination items to show

    // Fetch temples data
    useEffect(() => {
        const fetchTemples = async () => {
            try {
                const response = await fetch(baseurl + '/api/user/get/alltemple')
                const result = await response.json()

                // Clean up photo paths by removing 'public' prefix
                const processedData = result.temples.map((item) => ({
                    ...item,
                    photos: item.photos.map(photo => photo.replace('public', ''))
                }));

                setData(processedData)
                setFilterData(processedData)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching temples:", error)
                setLoading(false)
            }
        }

        fetchTemples()
    }, [baseurl])

    // Handle view toggle (grid)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    // Per page handler
    const perPageHandler = (e) => {
        const end = Number.parseInt(e.target.value, 10)
        if (end === 0) {
            setCardsPerPage(data.length)
            setLimit(data.length)
        } else {
            setCardsPerPage(end)
            setLimit(end)
        }
        setCurrentPage(1) // Reset to the first page
    }

    // Clear all filters
    const clearAll = () => {
        setFilterData(data)
        setCardsPerPage(12)
        setLimit(12)
        setSorterName("")
        setCurrentPage(1)
    }

    // Search functionality
    useEffect(() => {
        if (searchRef && searchRef.current && searchRef.current.value !== "") {
            const searchTerm = searchRef.current.value.toLowerCase();
            const newData = data.filter((item) => {
                return (
                    (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                    (item.description && item.description.toLowerCase().includes(searchTerm))
                );
            });
            setFilterData(newData);
            setCurrentPage(1); // Reset to first page on new search
        } else {
            setFilterData(data);
        }
    }, [searchRef, data]);

    // Update pagination
    useEffect(() => {
        const createPagination = () => {
            if (filterData.length > 0) {
                const pageCount = Math.ceil(filterData.length / limit);
                const paginationArray = Array.from({ length: pageCount }, (_, i) => i + 1);

                setPagination(paginationArray);
                setPages(pageCount);
            } else {
                setPagination([]);
                setPages(0);
            }
        };

        createPagination();
    }, [limit, filterData, filterData.length]);

    // Get paginated temples
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, filterData.length);
    const getPaginatedProducts = filterData.slice(startIndex, endIndex);

    // Get pagination group - show appropriate page numbers
    const getPaginationGroup = () => {
        // For fewer pages, show all
        if (pages <= paginationItem) {
            return pagination;
        }

        // For current page near start
        if (currentPage <= Math.ceil(paginationItem / 2)) {
            return pagination.slice(0, paginationItem);
        }

        // For current page near end
        if (currentPage > pages - Math.ceil(paginationItem / 2)) {
            return pagination.slice(pages - paginationItem);
        }

        // For current page in middle
        const start = currentPage - Math.ceil(paginationItem / 2);
        return pagination.slice(start, start + paginationItem);
    };

    // Pagination navigation
    const next = () => {
        if (currentPage < pages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    return (
        <>
            <div className="product-filter-content mb-40">
                <div className="row align-items-center justify-content-center">
                    <div className="col-sm-6">
                        <div className="product-filter-content__text">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search Temples"
                                onChange={(e) => {
                                    const searchTerm = e.target.value.toLowerCase();
                                    const newData = data.filter((item) => {
                                        return (
                                            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                                            (item.description && item.description.toLowerCase().includes(searchTerm))
                                        );
                                    });
                                    setFilterData(newData);
                                    setCurrentPage(1); // Reset to first page on new search
                                }}
                                style={{margin: "0 0 50px 0", height: "50px", borderRadius: "10px"}}
                            />
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="product-item-count">
                            <span>
                                <b>{filterData.length}</b> Temples Found (<b>{getPaginatedProducts.length}</b> Showing)
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="product-navtabs d-flex justify-content-end align-items-center">
                            <div className="tp-shop-selector">
                                {(cardsPerPage !== 12 || sorterName !== "") && (
                                    <button onClick={() => clearAll()} className="btn btn-danger text-nowrap me-2">
                                        Reset Filters
                                    </button>
                                )}

                                <select
                                    onChange={(e) => perPageHandler(e)}
                                    className="chosen-single form-select ms-3"
                                    style={{ width: "100px" }}
                                    value={cardsPerPage}
                                >
                                    <option value={0}>All</option>
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={36}>36</option>
                                </select>
                            </div>
                            <div className="tpproductnav tpnavbar product-filter-nav">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button
                                            className="nav-link active"
                                            onClick={() => handleOnClick(2)}
                                        >
                                            <i className="fal fa-th" />
                                        </button>
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
                        <div className="tab-pane fade show active">
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 tpproduct main_box_2">
                                {loading && (
                                    <div className="col-12 text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                {!loading && getPaginatedProducts.length > 0 ? (
                                    getPaginatedProducts.map((item, i) => (
                                        <Fragment key={item._id || i}>
                                            <ShopCard item={item} index={i} />
                                        </Fragment>
                                    ))
                                ) : (
                                    !loading && (
                                        <div className="col-12 text-center py-5">
                                            <h2>No Temples Data Available</h2>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="centerpagination">
                {pages > 1 && (
                    <Pagination
                        getPaginationGroup={getPaginationGroup()}
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