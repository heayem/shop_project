import React, { useEffect, useState } from 'react';
import './userListPage.css'
import { Col, Spinner } from 'react-bootstrap';
import { request } from '../util/api';

const Cart = () => {

    const [Data, setData] = useState([])
    const [Cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(true)

    useEffect(() => {
        getList()
        getCart()
    }, [])


    const getList = () => {
        setLoading(true)
        const urls = "orderprouct?user_id=1&cart_id=2&order_status=2"
        request("GET", urls, {}).then(res => {
            let data = res.data
            if (res.data.error === true) {
                const err = res.data.message
                if (err == {}) {
                    for (const [key, value] of Object.entries(err)) {
                        setMessage(`${value}`);
                    }
                } else {
                    setMessage(err);

                }
            } else {
                setLoading(false)
                setData(data.list)
            }

        }).catch(err => {
            if (err.code == "ERR_NETWORK") {
                alert("Can not connect to server. Plase contact administration!")
                return false
            }
            return false
        })
    }
    const getCart = () => {
        setLoading(true)
        const url = "cart/getList?page=1"
        request("GET", url, {}).then(res => {
            let data = res.data
            if (res.data.error === true) {
                const err = res.data.message
                if (err == {}) {
                    for (const [key, value] of Object.entries(err)) {
                        setMessage(`${value}`);
                    }
                } else {
                    setMessage(err);

                }
            } else {
                setLoading(false)
                setCart(data.list)
            }

        }).catch(err => {
            if (err.code == "ERR_NETWORK") {
                alert("Can not connect to server. Plase contact administration!")
                return false
            }
            return false
        })
    }

    return (
        <div className="Row h-100">

            {loading === true ?
                <Col className='d-flex flex-column justify-content-center  align-items-center h-100 text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
                :
                <>
                    <div className=' col-12'>

                        <div className="col-12 d-flex flex-row  p-1 justify-content-start ">
                            <>
                                <h1 className='text-danger'>Cart List </h1>
                                <div className="input-group m-1 h-25 w-25">
                                    <input type="text" className="form-control " placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                </div>
                                <div className="input-group m-1 h-25 w-25">
                                    <input type="datetime-local" className="form-control " />
                                </div>
                            </>
                        </div>

                    </div>
                    <hr class="my-0" />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4'>
                                <div className='container'>
                                    <div className='row'>
                                        {
                                            Cart.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className='col-12'>
                                                            {item.Id}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.User_Id}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Product_Id}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Quantity}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Create_at}
                                                        </div>
                                                    </>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className='container'>
                                    <div className='row'>
                                        {
                                            Data.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className='col-12'>
                                                            {item.Order_product_Id}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.cart_id}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.order_num}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.P_Name}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Total}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Grand_Total}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.order_status}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.payment_id}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Description}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.User_Name}
                                                        </div>
                                                        <div className='col-12'>
                                                            {item.Date_Post}
                                                        </div>
                                                    </>

                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>

    )
}
export default Cart

