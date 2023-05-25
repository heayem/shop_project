import React, { useEffect, useState } from 'react';
import './userListPage.css'
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import axios from 'axios';
import Icon from '../Component/Icon.compo';
import { Form, Button, Alert, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { MdCreateNewFolder } from 'react-icons/md';
import { request } from '../util/api';


const User = () => {

    const [Data, setData] = useState([])
    const [Page, setPage] = useState(1)
    const [pageNum, setPageNum] = useState(0)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const [err, setErr] = useState("")
    const [edit, setEdit] = useState(false)

    const [isActive, setIsActive] = useState(1)
    const [id, setId] = useState(2)
    const [name, setName] = useState("")
    const [pwd, setPwd] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")


    useEffect(() => {
        getList();
    }, [Page])


    const getList = () => {
        setLoading(true)
        const urls = "user?page=" + Page
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
                setPageNum(data.pageNum)
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
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); setEdit(false) };

    const handleEdit = item => {
        setId(item.User_Id)
        handleShow()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const method = id !== undefined ? "PUT" : "POST"
        axios({
            url: "http://localhost:8080/api/user",
            data: {
                User_Id: id,
                User_Name: name,
                Password: pwd,
                Tel: tel,
                Email: email,
                Status: isActive,
                Time_LogOut: null

            },
            method: method
        }).then(res => {
            console.log(res)
            if (res.error === true) {
                alert("erroe")
                setErr(res.data?.message)
                setMessage(true)

            } else {
                setLoading(false)
                clearForm()
                handleClose()
                setMessage(res.data?.message)
                getList()
            }

        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                setErr(err?.message)
                setMessage(true)
            }
        })
    }
    const clearForm = () => {
        setId()
        setName("")
        setPwd("")
        setEmail("")
        setIsActive(1)
        setTel("")
    }

    const closeDelete = () => { setDeleting(false) }
    const showDete = () => { setDeleting(true) }
    const handleDelete = e => {
        setId(e.User_Id)
        showDete()
    }
    const confirmDelete = () => {
        setLoading(true)
        axios({
            url: "http://localhost:8080/api/user",
            data: { User_Id: id },
            method: "DELETE"
        }).then(res => {
            if (res.data.error === true) {
                setMessage(res.data.message)
                setMessage(true)

            } else {
                setLoading(false)
                getList()
                clearForm()
                closeDelete()
            }
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                setErr(err.message)
                setMessage(true)
            }
        })
    }

    return (
        <div className="Row h-100">

            {loading === true ?
                <Col className='d-flex flex-column justify-content-center  align-items-center h-100 text-center'>
                    <p>{err}</p>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
                :
                <>
                    <div className=' col-12'>

                        <div className="col-12 d-flex flex-row  p-1 justify-content-start ">
                            <>
                                <h1 className='text-danger'>User List </h1>
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

                                <MdCreateNewFolder className='fs-1 text-primary m-1'
                                    type='button'
                                    onClick={handleShow}
                                />
                            </>
                        </div>

                    </div>
                    <hr class="my-0" />
                    <div className='col-12 table-responsive  overflow-auto m-0'>
                        <table className='table text-dark text-left  font-weight-normal table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'> ID</th>
                                    <th scope='col'> Name</th>
                                    <th scope='col'> Email</th>
                                    <th scope='col'> Telephone</th>
                                    <th scope='col'> Status</th>
                                    <th scope='col'> Create_At</th>
                                    <th scope='col'> Time_LogIn</th>
                                    <th scope='col'> Time_LogOut</th>
                                    <th scope='col'> Action</th>

                                </tr>
                            </thead>
                            {Data.map((item, index) => {
                                return (
                                    <tbody>

                                        <tr key={index} className='fs-6'>
                                            <td>{index + 1}</td>
                                            <td style={{ width: 200 }}>{item.User_Name}</td>
                                            <td>{item.Email}</td>
                                            <td >
                                                {item.Tel}
                                            </td>
                                            <td>
                                                {item.Status === 1 ?
                                                    <Icon choose={'patch-check-yes'} color={'blue'} />
                                                    : <Icon choose={'patch-check-no'} color={'red'} />
                                                }
                                            </td>
                                            <td>{item.Create_At}</td>
                                            <td >{item.Time_LogIn}</td>
                                            <td >{item.Time_LogOut}</td>
                                            <td colSpan={2}>
                                                <TbEdit
                                                    className='fs-5 text-primary m-1'
                                                    type='button'
                                                    onClick={() => {
                                                        handleEdit(item)
                                                        setEdit(true)
                                                    }
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
                        <Modal.Header closeButton >
                            <Modal.Title>
                                User
                            </Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Row>
                                    <Col className='mb-0'>
                                        {edit === false ?
                                            <>
                                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        value={name}
                                                        type="text"
                                                        placeholder="User name..."
                                                        autoFocus
                                                        onChange={(e) => setName(e.target.value)}

                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        value={email}
                                                        type="email"
                                                        placeholder="Example@gmail.com"
                                                        onChange={(e) => setEmail(e.target.value)}

                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        value={pwd}
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(e) => setPwd(e.target.value)}

                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Telephone</Form.Label>
                                                    <Form.Control
                                                        value={tel}
                                                        type="number"
                                                        placeholder="Telephone"
                                                        onChange={(e) => setTel(e.target.value)}

                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                                    <Form.Check
                                                        inline
                                                        autoFocus
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
                                            </>
                                            :
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                                <Form.Check
                                                    inline
                                                    autoFocus
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
                                        }

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
export default User

// <div className="mainList">
// <div
//     className={Popup === true ? "pop container" : ""}
//     onClick={() => {
//         setFrom(false)
//         setpop(false)
//     }}
// >

// </div>
// {From === true ? <PopFrom /> : null}
// <div className="TopTable">
//     <MdCreateNewFolder className='IconCreate' onClick={() => {
//         setFrom(!From)
//         setpop(!Popup)
//     }} />
//     <BsFillArrowLeftSquareFill
//         onClick={() => {
//             if (Page > 1) {
//                 setPage(Page - 1)
//             }

//         }}
//         className='IconCreate'

//     />
//     <p>{Page}/{pageNum}</p>

//     <BsFillArrowRightSquareFill
//         onClick={() => {
//             if (Page < pageNum) {
//                 setPage(Page + 1)
//             }
//         }}
//         className='IconCreate' />

//     <input placeholder='Search' />
// </div>
// <div className="Table">
//     <Table striped bordered hover>
//         <thead>
//             <tr>
//                 <th> U.ID</th>
//                 <th> U.Name</th>
//                 <th> U.Email</th>
//                 <th> U.Telephone</th>
//                 <th> U.Status</th>
//                 <th> U.Create_At</th>
//                 <th> U.Time_LogIn</th>
//                 <th> U.Time_LogOut</th>
//                 <th> U.Action</th>

//             </tr>
//         </thead>
//         {Data.map((item, index) => {
//             return (
//                 <tbody>

//                     <tr key={index} >
//                         <td>{item.User_Id}</td>
//                         <td style={{ width: 200 }}>{item.User_Name}</td>
//                         <td>{item.Email}</td>
//                         <td >
//                             {item.Tel}
//                         </td>
//                         <td>{item.Status === 1 ? "Active" : "Unactive"}</td>
//                         <td>{item.Create_At}</td>
//                         <td >{item.Time_LogIn}</td>
//                         <td >{item.Time_LogOut}</td>
//                         <td colSpan={2}>
//                             {/* <Btn
//                                 padding={1}
//                                 fontSize={20}
//                                 color={"blue"}
//                                 boder={"none"}
//                                 click={() => alert("Edit ")}
//                                 value={<TbEdit />} />
//                             <Btn
//                                 padding={1}
//                                 fontSize={20}
//                                 color={"Red"}
//                                 boder={"none"}
//                                 click={() => alert("Delete")}
//                                 value={<RiDeleteBin6Fill />} /> */}
//                         </td>
//                     </tr>
//                 </tbody>
//             )
//         })}

//     </Table>
// </div>
// </div>