import React from 'react'
import './salecard.css'
import data from '../../data/sales_homepage.json'

const SaleCard = () => {
    return (
        <>
            <div class="parent">
                <div class="card">
                    <div class="content-box">
                        <span class="card-title">Live&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Until</span>
                        {/* <p class="card-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p> */}
                        {/* <span class="see-more">See More</span> */}
                    </div>
                    <div class="date-box">
                        <span class="month">{data[0].fromMonth}</span>
                        <span class="date">{data[0].fromDate}</span>
                    </div>
                    <div class="date-box1">
                        <span class="month">{data[0].toMonth}</span>
                        <span class="date">{data[0].toDate}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SaleCard