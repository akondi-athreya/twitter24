'use client'
import Link from "next/link"
import { useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
    },

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.slider-pagination',
        clickable: true,
    },

    breakpoints: {
        0:{
            slidesPerView: 1,
            spaceBetween: 10
        },
        430:{
            slidesPerView: 2,
            spaceBetween: 10
        },
        // when window width is >= 640px (tablet)
        530: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 768px (small laptop)
        800: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        // when window width is >= 1024px (desktop)
        1024: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }

}

export default function Main_services() {
    const data = [
        {
            tittle: "Car Service",
            cards: [
                {
                    name: "Mechanic 1",
                    price: "$31.00",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpufpb5kotiA1-SxV0TilyD0JuQz-j5u08Q&s",
                    stars: 5
                }, {
                    name: "Mechanic 2",
                    price: "$31.00",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpufpb5kotiA1-SxV0TilyD0JuQz-j5u08Q&s",
                    stars: 1
                }, {
                    name: "Mechanic 3",
                    price: "$31.00",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpufpb5kotiA1-SxV0TilyD0JuQz-j5u08Q&s",
                    stars: 2
                }, {
                    name: "Mechanic 4",
                    price: "$31.00",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpufpb5kotiA1-SxV0TilyD0JuQz-j5u08Q&s",
                    stars: 4
                }
            ]
        }, {
            tittle: "Plumber Service",
            cards: [
                {
                    name: "Plumber 1",
                    price: "$31.00",
                    img: "https://media.licdn.com/dms/image/C5103AQGbRXzUy57DNQ/profile-displayphoto-shrink_200_200/0/1572365989364?e=2147483647&v=beta&t=32uTDCFHX0blbzRv_uBz2a_R1gOqXas8GVojlRm7ENA",
                    stars: 3
                }, {
                    name: "Plumber 2",
                    price: "$31.00",
                    img: "https://media.licdn.com/dms/image/C5103AQGbRXzUy57DNQ/profile-displayphoto-shrink_200_200/0/1572365989364?e=2147483647&v=beta&t=32uTDCFHX0blbzRv_uBz2a_R1gOqXas8GVojlRm7ENA",
                    stars: 5
                }, {
                    name: "Plumber 3",
                    price: "$31.00",
                    img: "https://media.licdn.com/dms/image/C5103AQGbRXzUy57DNQ/profile-displayphoto-shrink_200_200/0/1572365989364?e=2147483647&v=beta&t=32uTDCFHX0blbzRv_uBz2a_R1gOqXas8GVojlRm7ENA",
                    stars: 4
                }, {
                    name: "Plumber 4",
                    price: "$31.00",
                    img: "https://media.licdn.com/dms/image/C5103AQGbRXzUy57DNQ/profile-displayphoto-shrink_200_200/0/1572365989364?e=2147483647&v=beta&t=32uTDCFHX0blbzRv_uBz2a_R1gOqXas8GVojlRm7ENA",
                    stars: 2
                }
            ]
        }, {
            tittle: "Electrician Service",
            cards: [
                {
                    name: "Electrician 1",
                    price: "$31.00",
                    img: "https://cdn.vectorstock.com/i/500p/19/53/cartoon-electrician-cable-man-vector-29651953.jpg",
                    stars: 1
                }, {
                    name: "Electrician 2",
                    price: "$31.00",
                    img: "https://cdn.vectorstock.com/i/500p/19/53/cartoon-electrician-cable-man-vector-29651953.jpg",
                    stars: 3
                }, {
                    name: "Electrician 3",
                    price: "$31.00",
                    img: "https://cdn.vectorstock.com/i/500p/19/53/cartoon-electrician-cable-man-vector-29651953.jpg",
                    stars: 5
                }, {
                    name: "Electrician 4",
                    price: "$31.00",
                    img: "https://cdn.vectorstock.com/i/500p/19/53/cartoon-electrician-cable-man-vector-29651953.jpg",
                    stars: 4
                }
            ]
        }, {
            tittle: "Carpenter Service",
            cards: [
                {
                    name: "Carpenter 1",
                    price: "$31.00",
                    img: "https://t3.ftcdn.net/jpg/01/52/72/80/360_F_152728021_uUCcnhwVt8F2uy4lcC5llRa1U6bbP3KA.jpg",
                    stars: 2
                }, {
                    name: "Carpenter 2",
                    price: "$31.00",
                    img: "https://t3.ftcdn.net/jpg/01/52/72/80/360_F_152728021_uUCcnhwVt8F2uy4lcC5llRa1U6bbP3KA.jpg",
                    stars: 1
                }, {
                    name: "Carpenter 3",
                    price: "$31.00",
                    img: "https://t3.ftcdn.net/jpg/01/52/72/80/360_F_152728021_uUCcnhwVt8F2uy4lcC5llRa1U6bbP3KA.jpg",
                    stars: 3
                }, {
                    name: "Carpenter 4",
                    price: "$31.00",
                    img: "https://t3.ftcdn.net/jpg/01/52/72/80/360_F_152728021_uUCcnhwVt8F2uy4lcC5llRa1U6bbP3KA.jpg",
                    stars: 4
                }
            ]
        },
        {
            tittle: "Network Service",
            cards: [
                {
                    name: "Technician 1",
                    price: "$31.00",
                    img: "https://cdni.iconscout.com/illustration/premium/thumb/electrician-checking-voltage-using-meter-illustration-download-in-svg-png-gif-file-formats--repairing-electric-repair-work-technician-working-professional-pack-people-illustrations-5628861.png",
                    stars: 5
                }, {
                    name: "Technician 2",
                    price: "$31.00",
                    img: "https://cdni.iconscout.com/illustration/premium/thumb/electrician-checking-voltage-using-meter-illustration-download-in-svg-png-gif-file-formats--repairing-electric-repair-work-technician-working-professional-pack-people-illustrations-5628861.png",
                    stars: 1
                }, {
                    name: "Technician 3",
                    price: "$31.00",
                    img: "https://cdni.iconscout.com/illustration/premium/thumb/electrician-checking-voltage-using-meter-illustration-download-in-svg-png-gif-file-formats--repairing-electric-repair-work-technician-working-professional-pack-people-illustrations-5628861.png",
                    stars: 2
                }, {
                    name: "Technician 4",
                    price: "$31.00",
                    img: "https://cdni.iconscout.com/illustration/premium/thumb/electrician-checking-voltage-using-meter-illustration-download-in-svg-png-gif-file-formats--repairing-electric-repair-work-technician-working-professional-pack-people-illustrations-5628861.png",
                    stars: 4
                }
            ]
        }, {
            tittle: "Painting Service",
            cards: [
                {
                    name: "Painter 1",
                    price: "$31.00",
                    img: "https://i.pinimg.com/originals/b8/05/a1/b805a1a78dbbb17f184de5220be671fe.png",
                    stars: 3
                }, {
                    name: "Painter 2",
                    price: "$31.00",
                    img: "https://i.pinimg.com/originals/b8/05/a1/b805a1a78dbbb17f184de5220be671fe.png",
                    stars: 5
                }, {
                    name: "Painter 3",
                    price: "$31.00",
                    img: "https://i.pinimg.com/originals/b8/05/a1/b805a1a78dbbb17f184de5220be671fe.png",
                    stars: 4
                }, {
                    name: "Painter 4",
                    price: "$31.00",
                    img: "https://i.pinimg.com/originals/b8/05/a1/b805a1a78dbbb17f184de5220be671fe.png",
                    stars: 2
                }
            ]
        }, {
            tittle: "Appliance Repairs",
            cards: [
                {
                    name: "Repairer 1",
                    price: "$31.00",
                    img: "https://www.ssairconditionerrepair.in/wp-content/uploads/2021/07/255-2553978_best-home-appliance-repair-service-cartoon.png",
                    stars: 1
                }, {
                    name: "Repairer 2",
                    price: "$31.00",
                    img: "https://www.ssairconditionerrepair.in/wp-content/uploads/2021/07/255-2553978_best-home-appliance-repair-service-cartoon.png",
                    stars: 3
                }, {
                    name: "Repairer 3",
                    price: "$31.00",
                    img: "https://www.ssairconditionerrepair.in/wp-content/uploads/2021/07/255-2553978_best-home-appliance-repair-service-cartoon.png",
                    stars: 5
                }, {
                    name: "Repairer 4",
                    price: "$31.00",
                    img: "https://www.ssairconditionerrepair.in/wp-content/uploads/2021/07/255-2553978_best-home-appliance-repair-service-cartoon.png",
                    stars: 4
                }
            ]
        }, {
            tittle: "Interior Designer",
            cards: [
                {
                    name: "Designer 1",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/home-decorator-vector-id161814229?k=6&m=161814229&s=612x612&w=0&h=FnPi5kwwiPRI_G4C_tW49X6MUCYUDI__ylk6KKCuzss=",
                    stars: 2
                }, {
                    name: "Designer 2",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/home-decorator-vector-id161814229?k=6&m=161814229&s=612x612&w=0&h=FnPi5kwwiPRI_G4C_tW49X6MUCYUDI__ylk6KKCuzss=",
                    stars: 1
                }, {
                    name: "Designer 3",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/home-decorator-vector-id161814229?k=6&m=161814229&s=612x612&w=0&h=FnPi5kwwiPRI_G4C_tW49X6MUCYUDI__ylk6KKCuzss=",
                    stars: 3
                }, {
                    name: "Designer 4",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/home-decorator-vector-id161814229?k=6&m=161814229&s=612x612&w=0&h=FnPi5kwwiPRI_G4C_tW49X6MUCYUDI__ylk6KKCuzss=",
                    stars: 4
                }
            ]
        },
        {
            tittle: "Garden Service",
            cards: [
                {
                    name: "Gardener 1",
                    price: "$31.00",
                    img: "https://thumbs.dreamstime.com/z/illustration-happy-gardener-his-lawnmow-hand-drawn-vector-lawnmower-37386518.jpg",
                    stars: 5
                }, {
                    name: "Gardener 2",
                    price: "$31.00",
                    img: "https://thumbs.dreamstime.com/z/illustration-happy-gardener-his-lawnmow-hand-drawn-vector-lawnmower-37386518.jpg",
                    stars: 1
                }, {
                    name: "Gardener 3",
                    price: "$31.00",
                    img: "https://thumbs.dreamstime.com/z/illustration-happy-gardener-his-lawnmow-hand-drawn-vector-lawnmower-37386518.jpg",
                    stars: 2
                }, {
                    name: "Gardener 4",
                    price: "$31.00",
                    img: "https://thumbs.dreamstime.com/z/illustration-happy-gardener-his-lawnmow-hand-drawn-vector-lawnmower-37386518.jpg",
                    stars: 4
                }
            ]
        }, {
            tittle: "Locksmith Service",
            cards: [
                {
                    name: "Locksmith 1",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/cartoon-locksmith-character-vector-id938360350?k=6&m=938360350&s=612x612&w=0&h=Cw5Yomtij7uHqqHZVzDgsmeUUqVvXdQ6uUPLdJPcdn8=",
                    stars: 3
                }, {
                    name: "Locksmith 2",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/cartoon-locksmith-character-vector-id938360350?k=6&m=938360350&s=612x612&w=0&h=Cw5Yomtij7uHqqHZVzDgsmeUUqVvXdQ6uUPLdJPcdn8=",
                    stars: 5
                }, {
                    name: "Locksmith 3",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/cartoon-locksmith-character-vector-id938360350?k=6&m=938360350&s=612x612&w=0&h=Cw5Yomtij7uHqqHZVzDgsmeUUqVvXdQ6uUPLdJPcdn8=",
                    stars: 4
                }, {
                    name: "Locksmith 4",
                    price: "$31.00",
                    img: "https://media.istockphoto.com/vectors/cartoon-locksmith-character-vector-id938360350?k=6&m=938360350&s=612x612&w=0&h=Cw5Yomtij7uHqqHZVzDgsmeUUqVvXdQ6uUPLdJPcdn8=",
                    stars: 2
                }
            ]
        }, {
            tittle: "Fencing Service",
            cards: [
                {
                    name: "Fencebuilder 1",
                    price: "$31.00",
                    img: "https://st.depositphotos.com/1695366/1397/v/450/depositphotos_13979984-stock-illustration-cartoon-man-building-fence.jpg",
                    stars: 1
                }, {
                    name: "Fencebuilder 2",
                    price: "$31.00",
                    img: "https://st.depositphotos.com/1695366/1397/v/450/depositphotos_13979984-stock-illustration-cartoon-man-building-fence.jpg",
                    stars: 3
                }, {
                    name: "Fencebuilder 3",
                    price: "$31.00",
                    img: "https://st.depositphotos.com/1695366/1397/v/450/depositphotos_13979984-stock-illustration-cartoon-man-building-fence.jpg",
                    stars: 5
                }, {
                    name: "Fencebuilder 4",
                    price: "$31.00",
                    img: "https://st.depositphotos.com/1695366/1397/v/450/depositphotos_13979984-stock-illustration-cartoon-man-building-fence.jpg",
                    stars: 4
                }
            ]
        }, {
            tittle: "Photography Service",
            cards: [
                {
                    name: "Photographer 1",
                    price: "$31.00",
                    img: "https://static.vecteezy.com/system/resources/thumbnails/005/611/312/small_2x/a-male-photographer-holding-a-high-end-camera-long-lens-photographing-distant-birds-or-animals-flat-style-cartoon-illustration-free-vector.jpg",
                    stars: 2
                }, {
                    name: "Photographer 2",
                    price: "$31.00",
                    img: "https://static.vecteezy.com/system/resources/thumbnails/005/611/312/small_2x/a-male-photographer-holding-a-high-end-camera-long-lens-photographing-distant-birds-or-animals-flat-style-cartoon-illustration-free-vector.jpg",
                    stars: 1
                }, {
                    name: "Photographer 3",
                    price: "$31.00",
                    img: "https://static.vecteezy.com/system/resources/thumbnails/005/611/312/small_2x/a-male-photographer-holding-a-high-end-camera-long-lens-photographing-distant-birds-or-animals-flat-style-cartoon-illustration-free-vector.jpg",
                    stars: 3
                }, {
                    name: "Photographer 4",
                    price: "$31.00",
                    img: "https://static.vecteezy.com/system/resources/thumbnails/005/611/312/small_2x/a-male-photographer-holding-a-high-end-camera-long-lens-photographing-distant-birds-or-animals-flat-style-cartoon-illustration-free-vector.jpg",
                    stars: 4
                }
            ]
        },
    ]

    const [isToggled, setToggled] = useState(true)
    const handleToggle = () => setToggled(!isToggled)

    return (
        <>
            <div className="tp-slider-area p-relative row justify-content-xl-center">
                <div className="swiper-container slider-active d-flex row justify-content-lg-center">
                    <Swiper {...swiperOptions} className="d-flex justify-content-center align-items-center">
                        {data.map((item, index) => (
                            <SwiperSlide className="tpselectproduct_head">
                                <div key={index} className="col-xxl-3 col-lg-6 col-md-6">
                                    <div className="tpselectproduct">
                                        <h4 className="tpselectproduct__heading mb-35">{item.tittle}</h4>
                                        {item.cards.map((card, index) => (
                                            <div key={index} className="tpselectproduct__item d-flex align-items-center mb-25">
                                                <div className="tpselectproduct__thumb mr-25">
                                                    <img src={card.img} alt="thumb" />
                                                </div>
                                                <div className="tpselectproduct__content">
                                                    <h5 className="tpselectproduct__price"><Link href="/shop-details-2">{card.name}</Link></h5>
                                                    <h4 className="tpselectproduct__title">{card.price}</h4>
                                                    <div className="tpselectproduct__rating">
                                                        {[...Array(card.stars)].map((star, index) => (
                                                            <Link key={index} href="#"><i className="fas fa-star" /></Link>
                                                        ))}
                                                        {[...Array(5 - card.stars)].map((star, index) => (
                                                            <Link key={index} className="max-star" href="#"><i className="fas fa-star" /></Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="slider-pagination" />
            </div>
        </>
    )
}
