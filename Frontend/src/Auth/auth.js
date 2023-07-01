import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Spinner, Col, Modal } from "react-bootstrap";


const Login = () => {
    const [key, setKey] = useState('Login');
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [telelphone, setTelephone] = useState()
    const [username, setUsername] = useState()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()


    const hideModal = () => {
        setShow(false)
    }

    const login = () => {
        // e.preventDefault()
        setLoading(true)
        axios({
            url: "http://localhost:8080/api/login",
            data: {
                Tel: email,
                email: email,
                Password: password
            },
            method: "POST"
        }).then(res => {
            if (res.data.error === true) {
                setMessage(res.data.message)
                setShow(true)
                setLoading(false)
            } else {
                setLoading(false)
                const profile = res.data.user
                const role = res.data.role[0].Role_Id
                localStorage.setItem("profile", JSON.stringify(profile))
                localStorage.setItem("role", role)
                localStorage.setItem('token', res.data.acc_token)
                localStorage.setItem("login", 1)
                clearForm()
                window.location = ("/")
            }
        })
    }
    const register = () => {
        // e.preventDefault()
        axios({
            url: "http://localhost:8080/api/user",
            data: {
                User_Name: username,
                Password: password,
                Tel: telelphone,
                Email: email,
                role: 2
            },
            method: "POST"
        }).then(res => {
            setLoading(true)
            if (res.data.error === true) {
                const err = res.data.message
                if (err == {}) {
                    for (const [key, value] of Object.entries(err)) {
                        setMessage(`${value}`);
                    }
                } else {
                    setMessage(err);

                }

                setShow(true)
                setLoading(false)
            } else {
                setLoading(false)
                setKey("Login")
                clearForm()

            }
        })
    }
    function clearForm() {
        setEmail()
        setUsername()
        setPassword()
        setTelephone()
    }




    return (
        <>
            <div className="Container h-100 ">
                <div className="Row h-100 d-flex flex-row justify-content-cener item-center ">
                    <div className="col-6 m-auto">
                        {loading === true ?
                            <Col className='d-flex flex-row justify-content-center  align-items-center h-100 text-center'>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Col>
                            :

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="Login" title="Login">
                                    <Form onSubmit={login}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text"
                                                placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPwd">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                placeholder="Enter passwrd" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button
                                                onClick={login}
                                                className="w-100"
                                                variant="primary"
                                            // type="submit"
                                            >
                                                Login
                                            </Button>
                                        </Form.Group>
                                    </Form>

                                </Tab>
                                <Tab eventKey="Register" title="Register">
                                    <Form onSubmit={register}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>User name</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setUsername(e.target.value)}
                                                type="text"
                                                placeholder="Enter name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                placeholder="Enter passwrd" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicTelephpne">
                                            <Form.Label>telelphone number</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setTelephone(e.target.value)}
                                                type="number"
                                                placeholder="Enter telelphone numer" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button
                                                onClick={register}
                                                className="w-100"
                                                variant="primary"
                                            // type="submit"
                                            >
                                                Register
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Tab>
                            </Tabs>
                        }

                    </div>
                </div>
                <Modal
                    show={show}
                    onHide={hideModal}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Message Error
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">
                            {message}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
export default Login