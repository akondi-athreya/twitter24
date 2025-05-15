import Link from "next/link"

const ShopCardList = ({ item }) => {
    return (
        <>
            <div className="row mb-40">
                <div className="col-lg-4 col-md-12">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/shop/${item.id}`}>
                                <img src={`${item.imgf}`} alt="product-thumb" />
                                <img className="thumbitem-secondary" src={`${item.imgb}`} alt="product-thumb" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="filter-product ml-20 pt-30">
                        <h3 className="filter-product-title">
                            <Link href={`/shop/${item.id}`}>{item.title}</Link>
                        </h3>
                        <div className="tpproduct__ammount">
                            <span>{item.price?.max}</span>
                            {item.price?.discount && <del>{item.price?.discount}</del>}
                        </div>
                        <div className="tpproduct__rating mb-15">
                            <ul>
                                <li>
                                    <Link href="#">
                                        <i className="fas fa-star" />
                                    </Link>
                                    <Link href="#">
                                        <i className="fas fa-star" />
                                    </Link>
                                    <Link href="#">
                                        <i className="fas fa-star" />
                                    </Link>
                                    <Link href="#">
                                        <i className="fas fa-star" />
                                    </Link>
                                    <Link href="#">
                                        <i className="far fa-star" />
                                    </Link>
                                </li>
                                <li>
                                    <span>(81)</span>
                                </li>
                            </ul>
                        </div>
                        <p>
                            {item.description ||
                                "Product description goes here. This is a placeholder text that will be replaced with the actual product description from the API."}
                        </p>
                        <div className="tpproduct__action">
                            <Link className="comphare" href="#">
                                <i className="fal fa-exchange" />
                            </Link>
                            <Link className="quckview" href="#">
                                <i className="fal fa-eye" />
                            </Link>
                            <Link className="wishlist" href="#">
                                <i className="fal fa-heart" />
                            </Link>
                            <Link href="#">
                                <i className="fal fa-shopping-basket" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCardList

