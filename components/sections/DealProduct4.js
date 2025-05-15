import Link from "next/link"
import Countdown from "../elements/CountDown"
import VideoPopup from "../elements/VideoPopup"
import SaleCard from "../elements/SaleCard"


export default function DealProduct4() {
    const currentTime = new Date()
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        <>
            <section className="dealproduct-area tp-fourth-deal video-area platinam-light p-relative">
                <div className="tpvideo-bg" style={{display: "flex", justifyContent: 'center', overflow:"hidden"}}>
                    <img src="/assets/img/sale_black_friday.jpg" alt="banner" height='100%'/>
                </div>
                <div className="container">
                    <div className="row gx-0">
                        <div className="col-xxl-5 col-lg-6 col-md-12">
                            <div className="tpdealcontact pt-130 pb-140">
                                <div className="tpdealcontact__price mb-5">
                                    <span>Sale</span>
                                </div>
                                <div className="tpdealcontact__text mb-30">
                                    <h4 className="tpdealcontact__title mb-20"><Link href="/shop-details-2">We are here to Serve.</Link></h4>
                                    <p>Checkout our New Sale.<br />Grab Huge Discounts Near You.</p>
                                </div>
                                <div className="tpdealcontact__progress mb-30">
                                    <div className="progress">
                                        <div className="progress-bar w-75" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                                <div className="tpdealcontact__count">
                                    <div className="tpdealcontact__countdown">
                                        {/* <Countdown endDateTime={currentTime.setDate(currentTime.getDate() + 2)} /> */}
                                        <SaleCard />
                                    </div>
                                    <i>Sale Season <br /> Continues</i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7 col-lg-6 col-md-12" />
                    </div>
                </div>
            </section>
        </>
    )
}
