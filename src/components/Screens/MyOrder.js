import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:5000/api/myorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            await setorderData(response);
        });
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {Object.keys(orderData).length !== 0 ? Object.entries(orderData).map(([orderId, data]) => (
                        data.order_data ? data.order_data.slice(0).reverse().map((item) => (
                            item.map((arrayData, index) => (
                                <div key={index}>
                                    {arrayData.Order_date ? (
                                        <div className='m-auto mt-5'>
                                            {arrayData.Order_date}
                                            <hr />
                                        </div>
                                    ) : (
                                        <div className='col-12 col-md-6 col-lg-3' key={index}>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <div className="card-body bg-success">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrayData.qty}</span>
                                                        <span className='m-1'>{arrayData.size}</span>
                                                        <span className='m-1'>{orderId}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5' >
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )) : ""
                    )) : ""}
                </div>
            </div>

            <Footer />
        </div>
    )
}

