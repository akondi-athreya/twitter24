import Link from "next/link"
import CartShow from "../elements/CartShow"
import WishListShow from "../elements/WishListShow"
import { useAuth } from "@/context/AuthContext"


export default function HeaderTabSticky({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar, onLoginPage }) {
    const {logout} = useAuth();

    return (
        <>
            <div id="header-tab-sticky" className={`tp-md-lg-header d-none d-md-block d-xl-none pt-30 pb-30 ${scroll ? "header-sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 d-flex align-items-center">
                            <div className="header-canvas flex-auto">
                                <button className="tp-menu-toggle" onClick={handleMobileMenu}><i className="far fa-bars" /></button>
                            </div>
                            <div className="logo main_logo" >
                                <Link href="/">
                                    <p className="main_logo_p">twitter<span color="#6e44ff">24</span>.</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="header-meta-info d-flex align-items-center justify-content-between">
                                <div className="header-search-bar">
                                    {/* <form action="#">
                                        <div className="search-info p-relative">
                                            <button className="header-search-icon"><i className="fal fa-search" /></button>
                                            <input type="text" placeholder="Search products..." />
                                        </div>
                                    </form> */}
                                </div>
                                {onLoginPage != true && <div className="header-meta__social d-flex align-items-center ml-25">
                                    {/* <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                        <i className="fal fa-shopping-cart" />
                                        <CartShow />
                                    </button>
                                    <Link href="/sign-in"><i className="fal fa-user" /></Link>
                                    <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
                                        <i className="fal fa-heart" />
                                        <WishListShow />
                                    </Link> */}
                                    <Link href="/profile" className="profile"><i className="fal fa-user" /></Link>
                                        {/* <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
                                            <i className="fal fa-heart" />
                                            <WishListShow />
                                        </Link> */}
                                        {/* logout functionality with icon */}
                                        <button class="header-logout" onClick={() => logout()}>
                                            <i class="fa fa-sign-out"></i>
                                        </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
