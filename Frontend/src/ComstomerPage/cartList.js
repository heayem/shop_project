import React, { useEffect, useState } from 'react';
import './userListPage.css'
import { Col, Spinner } from 'react-bootstrap';
import { request } from '../util/api';
import ListGroup from 'react-bootstrap/ListGroup';

const Cart = () => {

    const [Data, setData] = useState([])
    const [Cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(true)
    const [cart_id, setCart_id] = useState()
    const [user_id, setUser_id] = useState()

    useEffect(() => {
        getList()
        getCart()
    }, [cart_id, user_id])


    const getList = () => {
        setLoading(true)
        const urls = "orderprouct?user_id=" + user_id + "&cart_id=" + cart_id + "&order_status=2"
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
    const handleEdit = item => {
        setCart_id(item.Id)
        setUser_id(item.User_Id)

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
                                            Cart != null ?
                                                Cart.map((item, index) => {
                                                    return (

                                                        <div className='col-12'>

                                                            <ListGroup as="ol" numbered>
                                                                <ListGroup.Item
                                                                    as="li"
                                                                    className="d-flex justify-content-between align-items-start"
                                                                    onClick={() => handleEdit(item)}
                                                                    type="button"
                                                                >
                                                                    <div className="ms-2 me-auto">
                                                                        <div className="fw-bold"><p>User:{item.User_Name}</p></div>
                                                                        <p>Product: {item.P_Name}</p>
                                                                        <p>Quantity: {item.Quantity}</p>
                                                                        <p>Date: {item.Create_at}</p>

                                                                    </div>

                                                                </ListGroup.Item>
                                                            </ListGroup>



                                                        </div>
                                                    )
                                                }
                                                )
                                                :
                                                <p>No data available</p>
                                        }
                                    </div >
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className='container'>
                                    <div className='row'>
                                        {
                                            Data != null ?
                                                Data.map((item, index) => {
                                                    return (
                                                        <div className='col-12'>

                                                            <ListGroup as="ol" numbered>
                                                                <ListGroup.Item
                                                                    as="li"
                                                                    className="d-flex justify-content-between align-items-start"
                                                                >
                                                                    <div className="ms-2 me-auto">
                                                                        <div className="fw-bold"><p>order_num:{item.order_num}</p></div>
                                                                        <p>cart_id: {item.cart_id}</p>
                                                                        <p>P_Name: {item.P_Name}</p>
                                                                        <p>order_num: {item.Total}</p>
                                                                        <p>Total:{item.Grand_Total}</p>
                                                                        <p>order_status:{item.order_status}</p>
                                                                        <p>payment_id:{item.payment_id}</p>
                                                                        <p>Description:{item.Description}</p>
                                                                        <p>User_Name:{item.User_Name}</p>
                                                                        <p>Date_Post:{item.Date_Post}</p>
                                                                    </div>

                                                                </ListGroup.Item>
                                                            </ListGroup>


                                                        </div>

                                                    )
                                                })
                                                :
                                                <p>No data available</p>

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

