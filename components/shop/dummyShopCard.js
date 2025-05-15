import Link from "next/link"
const ShopCard = ({ item, addToCart, addToWishlist}) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    // console.log(index)
    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/store/${item._id}`} target="_blank">
                                <img src={`${baseurl}/${item.StoreImages[0]}`} alt="first image"/>
                                {/* /assets/img/product/ */}
                                <img className="thumbitem-secondary" src={`${baseurl}/${item.StoreImages[1]}`} alt="second image" />
                            </Link>
                            
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <div className="tpproduct__priceinfo p-relative">
                            <div className="tpproduct__ammount">
                                <span>{item.StoreName}</span>
                            </div>
                        </div>
                        <h3 className="tpproduct__title mb-5"><Link href={`/store/${item.id}`}>{item.StoreCategory}</Link></h3>
                    </div>
                    {/* <div className="tpproduct__ratingarea">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="tpproductdot">
                                <Link className="tpproductdot__variationitem" href={`/shop/${item.id}`}>
                                    <div className="tpproductdot__termshape">
                                        <span className="tpproductdot__termshape-bg" />
                                        <span className="tpproductdot__termshape-border" />
                                    </div>
                                </Link>
                                <Link className="tpproductdot__variationitem" href={`/shop/${item.id}`}>
                                    <div className="tpproductdot__termshape">
                                        <span className="tpproductdot__termshape-bg red-product-bg" />
                                        <span className="tpproductdot__termshape-border red-product-border" />
                                    </div>
                                </Link>
                                <Link className="tpproductdot__variationitem" href={`/shop/${item.id}`}>
                                    <div className="tpproductdot__termshape">
                                        <span className="tpproductdot__termshape-bg orange-product-bg" />
                                        <span className="tpproductdot__termshape-border orange-product-border" />
                                    </div>
                                </Link>
                                <Link className="tpproductdot__variationitem" href={`/shop/${item.id}`}>
                                    <div className="tpproductdot__termshape">
                                        <span className="tpproductdot__termshape-bg purple-product-bg" />
                                        <span className="tpproductdot__termshape-border purple-product-border" />
                                    </div>
                                </Link>
                            </div>
                            <div className="tpproduct__rating">
                                <ul>
                                    <li>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="far fa-star" /></Link>
                                    </li>
                                    <li>
                                        <span>(81)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ShopCard