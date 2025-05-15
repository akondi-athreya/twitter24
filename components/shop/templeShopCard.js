import Link from "next/link"

const ShopCard = ({ item }) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/temple/${item?._id}`} target="_blank">
                                {item?.photos && item.photos.length > 0 && (
                                    <>
                                        <img src={`${baseurl}/${item.photos[0]}`} alt="temple-thumb" />
                                        {item.photos.length > 1 && (
                                            <img className="thumbitem-secondary" src={`${baseurl}/${item.photos[1]}`} alt="temple-thumb" />
                                        )}
                                    </>
                                )}
                            </Link>
                            {/* <div className="tpproduct__thumb-bg">
                                <div className="tpproductactionbg">
                                    <Link href={item?.location || "#"} target="_blank">
                                        <i className="fa fa-location-arrow"></i>
                                    </Link>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <div className="tpproduct__priceinfo p-relative">
                            <div className="tpproduct__ammount">
                                <span>{item?.name}</span>
                            </div>
                        </div>
                        <h3 className="tpproduct__title mb-5">
                            <Link href={`/temple/${item?._id}`}>
                                {item?.description ? (
                                    item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description
                                ) : ''}
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard