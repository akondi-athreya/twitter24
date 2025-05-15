import Link from "next/link"
const ShopCardList = ({ item, addToCart, addToWishlist }) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        <>
            <div className="row mb-10">
                <div className="col-lg-4 col-md-12">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/store/${item._id}`} target="_blank">
                                <img src={`${baseurl}/${item.StoreImages[0]}`} alt="product-thumb" />
                                <img className="thumbitem-secondary" src={`${baseurl}/${item.StoreImages[1]}`} alt="product-thumb" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="filter-product ml-20 pt-30">
                        <h3 className="filter-product-title"><Link href={`/store/${item._id}`} target="_blank">{item.StoreName}</Link></h3>
                        <div className="tpproduct__ammount">
                            <span>{item.StoreCategory}</span>
                            {/* <del>$25.00</del> */}
                        </div>
                        <p>{item.StoreDescription?.length > 100 ? `${item.StoreDescription?.substring(0, 100)}...` : item.StoreDescription}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCardList