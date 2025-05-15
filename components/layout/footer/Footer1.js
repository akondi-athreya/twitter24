import Link from "next/link"

export default function Footer1() {
    return (
        <>
            <footer>
                <div className="footer-area theme-bg pt-65">
                    <div className="container">
                        <div className="main-footer pb-15 mb-30">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-1 mb-40">
                                        <div className="footer-logo mb-30">
                                            <p className="main_logo_p">Twitter<span color="#6e44ff">24</span>.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-2 ml-30 mb-40">
                                        <h4 className="footer-widget__title mb-30">Information</h4>
                                        <div className="footer-widget__links">
                                            <ul>
                                                <li><Link href="#">Custom Service</Link></li>
                                                <li><Link href="#">FAQs</Link></li>
                                                <li><Link href="/track">Ordering Tracking</Link></li>
                                                <li><Link href="/contact">Contacts</Link></li>
                                                <li><Link href="#">Events</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-3 mb-40">
                                        <h4 className="footer-widget__title mb-30">My Account</h4>
                                        <div className="footer-widget__links">
                                            <ul>
                                                <li><Link href="#">Delivery Information</Link></li>
                                                <li><Link href="#">Privacy Policy</Link></li>
                                                <li><Link href="#">Discount</Link></li>
                                                <li><Link href="#">Custom Service</Link></li>
                                                <li><Link href="#">Terms  Condition</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-4 mb-40">
                                        <h4 className="footer-widget__title mb-30">Social Network</h4>
                                        <div className="footer-widget__links">
                                            <ul>
                                                <li><Link href="#"><i className="fab fa-facebook-f" />Facebook</Link></li>
                                                <li><Link href="#"><i className="fab fa-dribbble" />Dribbble</Link></li>
                                                <li><Link href="#"><i className="fab fa-twitter" />Twitter</Link></li>
                                                <li><Link href="#"><i className="fab fa-behance" />Behance</Link></li>
                                                <li><Link href="#"><i className="fab fa-youtube" />Youtube</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                    <div className="footer-widget footer-col-5 mb-40">
                                        <h4 className="footer-widget__title mb-30">Get Newsletter</h4>
                                        <p>Get on the list and get 10% off your first order!</p>
                                        <div className="footer-widget__newsletter">
                                            <form action="#">
                                                <input type="email" placeholder="Enter email address" />
                                                <button className="footer-widget__fw-news-btn tpsecondary-btn">Subscribe Now<i className="fal fa-long-arrow-right" /></button>
                                            </form>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="footer-cta pb-20">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-xl-6 col-lg-4 col-md-4 col-sm-6">
                                    <div className="footer-cta__contact">
                                        <div className="footer-cta__icon">
                                            <i className="far fa-envelope" />
                                        </div>
                                        <div className="footer-cta__text">
                                            <p>twitter24official@gmail.com</p>
                                            <span>Working 9:00 - 21:00</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-xl-6 col-lg-8 col-md-8 col-sm-6">
                                    <div className="footer-cta__source">
                                        <div className="footer-cta__source-content">
                                            <h4 className="footer-cta__source-title">Download App on Mobile</h4>
                                            <p>15% discount on your first purchase</p>
                                        </div>
                                        <div className="footer-cta__source-thumb">
                                            <Link href="#"><img src="/assets/img/footer/f-google.jpg" alt="google" /></Link>
                                            <Link href="#"><img src="/assets/img/footer/f-app.jpg" alt="app" /></Link>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright footer-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-7 col-md-5 col-sm-12">
                                    <div className="footer-copyright__content">
                                        <span>Copyright {new Date().getFullYear()} <Link href="/">@Twitter24</Link>. Developed by
                                            <Link href="#"> Athreya</Link>.</span>
                                    </div>
                                </div>
                                {/* <div className="col-xl-6 col-lg-5 col-md-7 col-sm-12">
                                    <div className="footer-copyright__brand">
                                        <img src="/assets/img/footer/f-brand-icon-01.png" alt="footer-brand" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
