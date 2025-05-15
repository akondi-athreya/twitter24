import Link from "next/link"
import CartShow from "../elements/CartShow"
import { useAuth } from "@/context/AuthContext"

export default function HeaderMobSticky({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar, onLoginPage }) {
    const {logout} = useAuth();
    return (
        <>
            <div id="header-mob-sticky" className={`tp-md-lg-header d-md-none pt-20 pb-20 ${scroll ? "header-sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        {onLoginPage != true ? <div className="col-3 d-flex align-items-center">
                            <div className="header-canvas flex-auto">
                                <button className="tp-menu-toggle" onClick={handleMobileMenu}><i className="far fa-bars" /></button>
                            </div>
                        </div> : <div className="col-3 d-flex align-items-center"></div>}
                        <div className="col-6">
                            <div className="logo main_logo" >
                                <Link href="/">
                                    <p className="main_logo_p">Twitter<span color="#6e44ff">24</span>.</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="header-meta-info d-flex align-items-center justify-content-end ml-25">
                                <div className="header-meta m-0 d-flex align-items-center">
                                    {onLoginPage != true &&<div className="header-meta__social d-flex align-items-center">
                                        {/* <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                            <i className="fal fa-shopping-cart" />
                                            <CartShow />
                                        </button>
                                        <Link href="/sign-in"><i className="fal fa-user" /></Link> */}
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
            </div>
        </>
    )
}
