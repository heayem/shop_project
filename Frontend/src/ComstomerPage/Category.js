import React, { useEffect, useState } from 'react';
import './userListPage.css'
import { MdCreateNewFolder } from 'react-icons/md';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import Icon from '../Component/Icon.compo';
import axios from 'axios';
import { Form, Button, Image, Row, Col, Spinner, Modal, Alert } from 'react-bootstrap';


const CategoryPage = () => {
    const [Data, setData] = useState([])
    const [Page, setPage] = useState(1)
    const [pageNum, setPageNum] = useState(0)
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(1)
    const [name, setName] = useState("")
    const [id, setId] = useState()
    const [order, setOrder] = useState(1)
    const [User_Id, setUserId] = useState(1)
    const [err, setErr] = useState("");
    const [deleting, setDeleting] = useState(false)
    const [message, setMessage] = useState(true)


    useEffect(() => {
        getList();
    }, [Page])


    const getList = () => {
        const urls = "http://localhost:8080/api/category?page=" + Page + ""
        axios({
            url: urls,
            data: {},
            method: "GET"

        }).then(res => {
            let data = res.data
            if (data.error === true) {
                setErr(data.message)
                setMessage(true)
            } else {
                setPageNum(data.pageNum)
                setData(data.list)
                setLoading(false)
            }
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                setErr(err.message)
                setMessage(true)
            }
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };
    const clearForm = () => {
        setId()
        setName("")
        setOrder(1)
        setIsActive(1)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const method = id !== undefined ? "PUT" : "POST"
        let data = { C_Name: name, C_Order: order, C_Status: isActive, User_Id: User_Id }
        if (id !== undefined) {
            data = { C_Id: id, C_Name: name, C_Order: order, C_Status: isActive, User_Id: User_Id }
        } else {
            data = { C_Name: name, C_Order: order, C_Status: isActive, User_Id: User_Id }
        }
        axios({
            url: "http://localhost:8080/api/category",
            data: data,
            method: method
        }).then(res => {
            var respone = res.data;
            if (respone.error === true) {
                setErr(respone.message.sqlMessage)
                setMessage(true)

            } else {
                clearForm()
                console.log(respone);
                setLoading(false)
                handleClose()
                getList();
            }
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                setErr(err.message)
                setMessage(true)
            }
        })

    }
    const handleEdit = item => {
        setId(item.C_Id)
        setUserId(item.User_Id)
        setName(item.C_Name)
        setIsActive(item.C_Status)
        setOrder(item.C_Order)
        handleShow()
    }


    const closeDelete = () => { setDeleting(false) }
    const showDete = () => { setDeleting(true) }
    const handleDelete = e => {
        setId(e.C_Id)
        showDete()
    }
    const confirmDelete = () => {
        setLoading(true)
        axios({
            url: "http://localhost:8080/api/category",
            data: { C_Id: id },
            method: "DELETE"
        }).then(res => {
            if (res.error === true) {
                setErr(res.message.sqlMessage)
            } else {
                setLoading(false)
                getList()
                clearForm()
                closeDelete()
            }
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                setErr(err.message)
            }
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
                                <h1 className='text-danger'>Category List</h1>
                                <div className="input-group m-1 h-25 w-25">
                                    <input type="text" className="form-control " placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-primary" type="button">
                                            <Icon choose={'search'} />
                                        </button>
                                    </div>
                                </div>
                                <div className="input-group m-1 h-25 w-25">
                                    <input type="datetime-local" className="form-control " />
                                </div>
                            </>

                            <>
                                <MdCreateNewFolder className='fs-1 text-primary m-1'
                                    type='button'
                                    onClick={handleShow}
                                />
                            </>
                        </div>

                    </div>

                    <hr class="my-0" />
                    <div className='col-12 table-responsive m-0'>
                        <table className='table text-dark text-left font-weight-normal table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'> No</th>
                                    <th scope='col'> Name</th>
                                    <th scope='col'> Order number</th>
                                    <th scope='col'> Status</th>
                                    <th scope='col'> User_Name</th>
                                    <th scope='col'> Action</th>

                                </tr>
                            </thead>
                            {Data.map((item, index) => {
                                return (
                                    <tbody>

                                        <tr key={index} className='fs-6' >
                                            <td>{index + 1}</td>
                                            <td style={{ width: 200 }}>{item.C_Name}</td>
                                            <td >
                                                {item.C_Order}
                                            </td>
                                            <td>
                                                {item.C_Status === 1 ?
                                                    <Icon choose={'patch-check-yes'} color={'blue'} />
                                                    : <Icon choose={'patch-check-no'} color={'red'} />
                                                }
                                            </td>
                                            <td>{item.User_Name}</td>

                                            <td colSpan={2}>
                                                <TbEdit
                                                    className='fs-5 text-primary m-1'
                                                    type='button'
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }

                                                />
                                                <RiDeleteBin6Fill
                                                    className='fs-5 text-danger m-1'
                                                    type='button'
                                                    onClick={() => handleDelete(item)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </table>
                        <div className='col-12 d-flex flex-row m-0 p-0 justify-content-end '>

                            <button
                                onClick={() => {
                                    if (Page > 1) {
                                        setPage(Page - 1)
                                    }

                                }}

                                className='btn'
                                type='button' >
                                <BsFillArrowLeftSquareFill
                                    onClick={() => {
                                        if (Page > 1) {
                                            setPage(Page - 1)
                                            setLoading(true)

                                        }

                                    }}

                                    className='fs-2 text-info'

                                />
                            </button>
                            <p className='text-primary fs-4'>{Page}/{pageNum}</p>
                            <button
                                onClick={() => {
                                    if (Page < pageNum) {
                                        setPage(Page + 1)
                                        setLoading(true)

                                    }
                                }}

                                className='btn'
                                type='button' >
                                <BsFillArrowRightSquareFill

                                    className='fs-2 text-info ' />
                            </button>


                        </div>
                    </div>

                    <Modal
                        show={deleting}
                        onHide={closeDelete}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Deleting confirm
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="alert alert-danger">Are you sure to delete?</div>
                        </Modal.Body>
                        <Modal.Footer>

                            <>
                                <Button variant="secondary" onClick={closeDelete}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type='submit'
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </Button>
                            </>
                        </Modal.Footer>


                    </Modal>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="md"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Category
                            </Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Row>
                                    <Col className='mb-0'>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1" >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                value={name}
                                                type="text"
                                                placeholder="Name..."
                                                autoFocus
                                                onChange={(e) => setName(e.target.value)}

                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Order Number</Form.Label>
                                            <Form.Control
                                                value={order}
                                                type="number"
                                                placeholder="Order number"
                                                // autoFocus
                                                onChange={(e) => setOrder(e.target.value)}

                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Check
                                                inline
                                                value={1}
                                                label="Active"
                                                name="isActive"
                                                type="radio"
                                                onChange={(e) => setIsActive(e.target.value)}

                                            />
                                            <Form.Check
                                                inline
                                                value={0}
                                                label="Disable"
                                                name="isActive"
                                                type="radio"
                                                onChange={(e) => setIsActive(e.target.value)}
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>


                            </Modal.Body>
                            <Modal.Footer>

                                <>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type='submit'
                                    // onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </>


                            </Modal.Footer>
                        </Form>

                    </Modal>




                </>
            }
        </div>


    )
}
export default CategoryPage