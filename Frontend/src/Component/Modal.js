
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useEffect } from 'react';
import { MdCreateNewFolder } from 'react-icons/md';
import { Form, Button, Image, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { TbEdit } from 'react-icons/tb'
import { RiDeleteBin6Fill } from 'react-icons/ri'

const Modal1 = ({ props, status, Data }) => {
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");

    //State for post product 
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [img, setImg] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(1)
    const [userId, setUserId] = useState(0)
    // const [date, setDate] = useState(0)

    const [data, setData] = useState([])


    const [editData, setEditData] = useState([]);

    //get category
    useEffect(() => {
        getList();
    }, [])


    const getList = () => {
        const urls = "http://localhost:8080/api/category"
        axios({
            url: urls,
            data: {},
            method: "GET"

        }).then(res => {
            let data = res.data
            setData(data.list)
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    const Edit = () => {
        setEditData(Data)
    }
    const clearForm = () => {
        setName("")
        setCategory("")
        setImg("")
        setPrice("")
        setDescription("")
        setIsActive(1)
        setUserId(0)
    }
    const handleSubmit = () => {
        // const method = obj.category_id !== undefined ? "PUT" : "POST"
        axios({
            url: "http://localhost:8080/api/create/product",
            data: {
                Category_Id: category,
                P_Description: description,
                P_Price: price,
                User_Id: 1,
                P_Name: name,
                images: img,
                P_Status: isActive

            },
            method: "POST",
            // header for upload file it's importan 
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }).then(res => {
            var respone = res.data;
            if (respone.error === true) {
                console.log(respone.message[0])
                setErr(respone.message)
            } else {
                console.log(respone);
                clearForm()
                handleClose()
            }

        })

    }
    return (

        <>
            {props === 'create' ?
                <MdCreateNewFolder className='fs-1 text-primary m-1'
                    type='button'
                    onClick={handleShow}
                /> : props === 'edit' ?
                    <Button
                        onClick={handleShow}
                        className='bg-primary m-1 text-white'>

                        <TbEdit />
                    </Button>
                    : props === 'delete' ?
                        <Button
                            onClick={handleShow}
                            className='bg-danger m-1 text-white'
                        >
                            <RiDeleteBin6Fill />
                        </Button>
                        : null
            }


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

                        <div>edit data : {editData.map((item, index) => {
                            return (
                                <div>{item.P_Id}</div>
                            )
                        })}</div>


                        {
                            props === 'create' ?
                                'Post new products'
                                : props === 'edit' ?
                                    'Edit'
                                    : props === 'delete' ?
                                        'Are you want to delete ?'
                                        : null

                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {

                        props === 'create' ?
                            <Form>
                                <Row>
                                    <Col className='mb-0'>
                                        {console.log(img)}
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
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                {data.map((item) => {
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

                            </Form>
                            : props === 'delete' ?

                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Are you delete ? </Form.Label>
                                        <Button onClick={handleClose}>  <RiDeleteBin6Fill /> </Button>
                                    </Form.Group>
                                </Form>
                                :

                                <Form>
                                    {Edit}
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Example textarea</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        props === 'create' ?
                            <>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={props === 'create' ? handleSubmit : null}
                                >
                                    {props === 'create' ? "Post" : "Update"}
                                </Button>
                            </>
                            : null

                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modal1