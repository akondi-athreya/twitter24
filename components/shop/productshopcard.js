import Link from "next/link"

const ShopCard = ({ item }) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/store/${item?.storeDetails?._id}`} target="_blank">
                                <img src={`${baseurl}${item?.productImages[0]}`} alt="product-thumb" />
                                <img className="thumbitem-secondary" src={`${baseurl}${item?.productImages[1]}`} alt="product-thumb" />
                            </Link>
                            <div className="tpproduct__thumb-bg">
                                <div className="tpproductactionbg">
                                    <Link href={`/store/${item?.storeDetails?._id}`} target="_blank">
                                        <i className="fa fa-location-arrow"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <div className="tpproduct__priceinfo p-relative">
                            <div className="tpproduct__ammount">
                                <span>{item?.productName}</span>
                            </div>
                        </div>
                        <h3 className="tpproduct__title mb-5">
                            <Link href="#">₹{item?.productPrice}</Link>
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard

