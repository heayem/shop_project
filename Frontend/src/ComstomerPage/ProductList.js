import React, { useEffect, useState } from 'react';
import './ProductLIst.css'
import Images from '../Component/Images';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import axios from 'axios';
import Icon from '../Component/Icon.compo';
import { MdCreateNewFolder } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';




const Product = () => {
    const [Data, setData] = useState([])
    const [Category, setCategory] = useState([])
    const [Page, setPage] = useState(1)
    const [pageNum, setPageNum] = useState(0)
    const [Cate_Num, setCate_Num] = useState();
    const [loading, setLoading] = useState(true)

    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [category, setcategory] = useState("")
    const [img, setImg] = useState(1)
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(1)
    const [userId, setUserId] = useState(0)
    const [deleting, setDeleting] = useState(false)

    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    const [searchName, setSearchName] = useState()
    // const [date, setDate] = useState(dayjs())
    const [date, setDate] = useState()




    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    const clearForm = () => {
        setId()
        setName("")
        setImg(1)
        setPrice("")
        setDescription("")
        setIsActive(1)
        setUserId(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const method = id !== undefined ? "PUT" : "POST"
        const url = id !== undefined ? "http://localhost:8080/api/product" : "http://localhost:8080/api/create/product"
        let data = {
            Category_Id: category,
            P_Description: description,
            P_Price: price,
            User_Id: 1,
            P_Name: name,
            images: img,
            P_Status: isActive
        }
        if (id !== undefined) {
            data = {
                P_Id: id,
                Category_Id: category,
                P_Description: description,
                P_Price: price,
                User_Id: 1,
                P_Name: name,
                images: img,
                P_Status: isActive
            }
        } else {
            data = {
                Category_Id: category,
                P_Description: description,
                P_Price: price,
                User_Id: 1,
                P_Name: name,
                images: img,
                P_Status: isActive
            }
        }


        axios({
            url: url,
            data: data,
            method: method,
            // header for upload file it's importan 
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }).then(res => {
            var respone = res.data;
            if (respone.error === true) {
                console.log(respone.message)
                setErr(respone.message)
            } else {
                console.log(respone);
                clearForm()
                setLoading(false)
                handleClose()
                getList();
            }

        })

    }

    useEffect(() => {
        getList();
        getCategory();
    }, [Cate_Num, Page, searchName, date])

    const getCategory = () => {
        axios({
            url: "http://localhost:8080/api/category",
            method: "GET"

        }).then(res => {
            let data = res.data
            setCategory(data?.list)
            setLoading(false)
        })
    }

    const getList = () => {
        let urls = "http://localhost:8080/api/product?page=" + Page + ""
        if (date) {
            urls = "http://localhost:8080/api/product?date=" + date + ""
        }
        if (Cate_Num) {
            urls = "http://localhost:8080/api/product?Category_Id=" + Cate_Num + "&page=" + Page + ""
        }
        if (searchName) {
            urls = "http://localhost:8080/api/product?name=" + searchName + ""
        }
        if (Cate_Num && searchName) {
            urls = "http://localhost:8080/api/product?name=" + searchName + "&Category_Id=" + Cate_Num + ""
        }



        axios({
            url: urls,
            data: {},
            method: "GET"

        }).then(res => {
            let data = res.data
            setPageNum(data.pageNum)
            setData(data?.list)
        })
    }

    const handleEdit = e => {
        // const image_Path = "http://localhost/Images/"
        setId(e.P_Id)
        setName(e.P_Name)
        setDescription(e.P_Description)
        setIsActive(e.isActive)
        // setImg(image_Path + e.Images)//plz set location 
        setUserId(2)
        console.log(img)
        setPrice(e.P_Price)
        handleShow()
    }

    const closeDelete = () => { setDeleting(false) }
    const showDete = () => { setDeleting(true) }
    const handleDelete = e => {
        setId(e.P_Id)
        showDete()
    }
    const confirmDelete = () => {
        setLoading(true)
        axios({
            url: "http://localhost:8080/api/product",
            data: { P_Id: id },
            method: "DELETE"
        }).then(res => {
            setLoading(false)
            console.log(res.data.message)
            getList()
            closeDelete()
            clearForm()

        })
    }




    return (
        <div className="Row h-100">
            {loading === true ?
                <Col className='d-flex flex-row justify-content-center  align-items-center h-100 text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
                :
                <>
                    <div className=' col-12'>

                        <div className="col-12 d-flex flex-row  p-1 justify-content-between">
                            <>
                                <h1 className='text-danger'>ProductList </h1>
                                {/* <p>{date}</p> */}

                                <div className="input-group m-1 h-25 w-25">
                                    <input type="text"
                                        onChange={(e) =>
                                            setSearchName(e.target.value)
                                        }
                                        className="form-control "
                                        placeholder="Search name..."
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2" />

                                </div>
                                <div className="input-group m-1 h-25 w-25">
                                    <input type="datetime-local"
                                        onClick={(e) => {
                                            setSearchName()
                                            clearForm()
                                            setDate(dayjs(e.target.value).format("YYYY-MM-DD"))
                                        }}
                                        className="form-control " />
                                </div>
                                <select className="form-select form-select-md m-1 h-25 w-25" aria-label="Default select example"
                                    // type='button'
                                    onChange={(e) => {
                                        setCate_Num(e.target.value)
                                        setPage(1)
                                        setSearchName()
                                        setDate()
                                    }}>
                                    {Category != null ? Category.map((item) => {
                                        return (
                                            <option
                                                value={item.C_Id}
                                            >
                                                {item.C_Name}
                                            </option>

                                        )
                                    })
                                        :
                                        null
                                    }

                                </select>

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
                                    <th scope='col'> Category</th>
                                    <th scope='col'> Price</th>
                                    <th scope='col'> Description</th>
                                    <th scope='col'> Photos</th>
                                    <th scope='col'> Status</th>
                                    <th scope='col'> User_Id</th>
                                    <th scope='col'> Date_Post</th>
                                    <th scope='col'> Action</th>
                                </tr>
                            </thead>
                            {Data != null ? Data.map((item, index) => {
                                return (
                                    <tbody >

                                        <tr key={index} className='fs-6' >
                                            <td >{index + 1}</td>
                                            <td >{item.P_Name}</td>
                                            <td>{item.C_Name}</td>
                                            <td>{item.P_Price}$</td>
                                            <td>{item.P_Description}</td>
                                            <td style={{}}><Images
                                                src={`http://localhost/Images/${item.Images}`}
                                                width={50}
                                                height={35}
                                            />
                                            </td>
                                            <td>{item.P_Status === 1 ?
                                                // parament css only
                                                <Icon choose={'patch-check-yes'} color={'blue'} />
                                                : <Icon choose={'patch-check-no'} color={'red'} />}</td>
                                            <td>{item.User_Id}</td>
                                            <td >{item.Date_Post}</td>
                                            <td>
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
                            }) :
                                <p>No data available</p>
                            }
                        </table>

                        <div className='col-12 d-flex flex-row m-0 p-0 justify-content-end '>

                            <button
                                onClick={() => {
                                    if (Page > 1) {
                                        setPage(Page - 1)
                                        setLoading(true)
                                        setSearchName()


                                    }

                                }}

                                className='btn'
                                type='button' >
                                <BsFillArrowLeftSquareFill
                                    onClick={() => {
                                        if (Page > 1) {
                                            setPage(Page - 1)
                                            setLoading(true)
                                            setSearchName()


                                        }

                                    }}

                                    className='fs-3 text-info'

                                />
                            </button>
                            <button
                                onClick={() => {
                                    if (Page < pageNum) {
                                        setPage(Page + 1)
                                    }
                                }}

                                className='btn'
                                type='button' >
                                <BsFillArrowRightSquareFill

                                    className='fs-3 text-info ' />
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
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                New products
                            </Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Row>
                                    <Col className='mb-0'>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1" >
                                            <Form.Control
                                                value={name}
                                                type="text"
                                                placeholder="Name..."
                                                autoFocus
                                                onChange={(e) => setName(e.target.value)}

                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                value={price}
                                                type="number"
                                                placeholder="Price $$$"
                                                // autoFocus
                                                onChange={(e) => setPrice(e.target.value)}

                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2" style={{ height: "40px" }} controlId="exampleForm.ControlInput1">
                                            <Form.Select
                                                style={{ height: "40px" }}
                                                size="sm"
                                                onClick={(e) => setcategory(e.target.value)}
                                            >
                                                {Category.map((item) => {
                                                    return (
                                                        <option value={item.C_Id}>{item.C_Name}</option>
                                                    )
                                                })}

                                            </Form.Select>
                                        </Form.Group>

                                    </Col>
                                    <Col className='mb-0'>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Control type="file"

                                                onChange={(e) => setImg(e.target.files[0])}
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

                                        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1" >
                                            <Form.Control
                                                as="textarea"
                                                placeholder='Description '
                                                type='text'
                                                rows={3}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
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
export default Product