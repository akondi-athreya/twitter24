"use client"
import { Fragment, useState, useEffect } from "react"
import ShopCard from "./productshopcard"
import ShopCardList from "./productshoplist"
import Pagination from "../blog/Pagination"
import "./style.css"

const FilterShopBox = ({ searchRef }) => {
    // State for products data
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

    // Fetch products data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await fetch(baseurl + '/api/user/get-complete-products')
                const result = await response.json()
                setData(result)
                setFilterData(result)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching products:", error)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Handle view toggle (grid/list)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    // Sort handler
    const sortHandler = (e) => {
        setSorterName(e.target.value)
        const sortedData = [...filterData]

        if (e.target.value === "asc") {
            sortedData.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
        } else {
            sortedData.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt)
            })
        }

        setFilterData(sortedData)
    }

    // Per page handler
    const perPageHandler = (e) => {
        const end = Number.parseInt(e.target.value, 10)
        if (end === 0) {
            setCardsPerPage(data.length)
            setFilterData(data)
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
        setCardsPerPage(0)
        setSorterName("")
        setCurrentPage(1)
    }

    // Search functionality
    useEffect(() => {
        if (searchRef && searchRef.current && searchRef.current !== "") {
            const newData = data?.filter((item) => {
                return item.title.toLowerCase().includes(searchRef.current.toLowerCase())
            })
            setFilterData(newData)
        }
    }, [searchRef, data])

    // Update pagination
    useEffect(() => {
        const createPagination = () => {
            if (filterData?.length > 0) {
                const arr = new Array(Math.ceil(filterData?.length / limit)).fill().map((_, idx) => idx + 1)

                setPagination(arr)
                setPages(Math.ceil(filterData.length / limit))
            } else {
                setPagination([])
                setPages(0)
            }
        }

        createPagination()
    }, [limit, filterData?.length, filterData])

    // Get paginated products
    const startIndex = (currentPage - 1) * limit
    const endIndex = startIndex + limit
    const getPaginatedProducts = filterData?.slice(startIndex, endIndex)

    // Get pagination group
    const start = Math.floor((currentPage - 1) / paginationItem) * paginationItem
    const end = start + paginationItem
    const getPaginationGroup = pagination.slice(start, end)

    // Pagination navigation
    const next = () => {
        if (currentPage < pages) {
            setCurrentPage((page) => page + 1)
        }
    }

    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage((page) => page - 1)
        }
    }

    const handleActive = (item) => {
        setCurrentPage(item)
    }

    return (
        <>
            <div className="product-filter-content mb-40">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="product-item-count">
                            <span>
                                <b>{getPaginatedProducts?.length}</b> Item On List
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="product-navtabs d-flex justify-content-end align-items-center">
                            <div className="tp-shop-selector">
                                {(cardsPerPage > 0 || sorterName !== "") && (
                                    <button onClick={() => clearAll()} className="btn btn-danger text-nowrap me-2">
                                        Clear All
                                    </button>
                                )}

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
                                    <option value={40}>40</option>  // Add this line for 40 items per page
                                </select>
                            </div>
                            <div className="tpproductnav tpnavbar product-filter-nav">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        
                                        <button
                                            className={activeIndex === 2 ? "nav-link active" : "nav-link"}
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
                        <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {loading && <p>Loading...</p>}
                            {!loading && getPaginatedProducts?.length > 0
                                ? getPaginatedProducts.map((item, i) => (
                                    <Fragment key={i}>
                                        <ShopCardList item={item} />
                                    </Fragment>
                                ))
                                : !loading && <p>No Data Available</p>}
                        </div>
                        <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct main_box_2">
                                {loading && <p>Loading...</p>}
                                {!loading && getPaginatedProducts?.length > 0
                                    ? getPaginatedProducts.map((item, i) => (
                                        <Fragment key={i}>
                                            <ShopCard item={item} index={i} />
                                        </Fragment>
                                    ))
                                    : !loading && <p>No Data Available</p>}
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

