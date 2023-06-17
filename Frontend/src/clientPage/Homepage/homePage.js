import {
    Container,
    Row,
    Col,
    Spinner,
    NavLink
} from "react-bootstrap"
// import Slider from "./Carousel.Compo"
import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBContainer
} from 'mdb-react-ui-kit';
import axios from "axios";
import Footer from "../../Component/Footer/footer.compo";
import logo from '../logo/logo.png'
import { Link } from "react-router-dom";



const Home = () => {
    const [cartSlide, setCartSlide] = useState()
    const [randomCartClient, setRandomCartClient] = useState()
    const [category, setCatgory] = useState()

    useEffect(() => {
        getCartSlide()
        randomCartClients()
        getCategory()
    }, [])

    const getCartSlide = () => {
        axios({
            url: "http://localhost:8080/api/product/slide",
            method: "GET"
        }).then(res => {
            if (res.data.error === true) {
                console.log(res.data.message)
            } else {
                setCartSlide(res.data.data)
            }
        })
    }
    const randomCartClients = () => {
        axios({
            url: "http://localhost:8080/api/product/randomCartClient",
            method: "GET"
        }).then(res => {
            if (res.data.error === true) {
                console.log(res.data.message)
            } else {
                setRandomCartClient(res.data.data)
            }
        })
    }
    const getCategory = () => {
        axios({
            url: "http://localhost:8080/api/category",
            method: "GET"
        }).then(res => {
            if (res.data.error === true) {
                console.log(res.data.message)
            } else {
                setCatgory(res.data.list)
            }
        })
    }
    return (
        <>

            <Container fluid>
                <Row >
                    <Col className="bg-white  mg-5 h-100 p-5" sm={12} md={12} lg={12} xl={12} >
                        <Row>
                            <Col sm={6} md={6} lg={6} xl={6} className=" bg-light shadow-1-strong p-0  mb-5  mt-5 ">
                                <Col sm={12} md={12} lg={12} xl={12} className="bg-info shadow-1-strong m-0 " style={{ "height": "50px" }}>
                                    <h1 className="text-light text-center ">Welcome to Computer Shop <MDBIcon fas icon="laptop-code" /></h1>
                                </Col>
                                <Col sm={12} md={12} lg={12} xl={12} className="p-1">
                                    <Row className="w-100">
                                        <Col sm={6} md={6} lg={6} xl={6} className="m-0 bg-image hover-zoom">
                                            <img src={logo} alt='...' />
                                        </Col>
                                        <Col sm={6} md={6} lg={6} xl={6} style={{ "height": "200px" }} className="m-0 mt-2 overflow-scroll">
                                            <h3>list <MDBIcon far icon="list-alt" /></h3>
                                            {category != null ? category.map((item, index) => {
                                                return (
                                                    <p key={index}>
                                                        <NavLink
                                                            className="text-success"
                                                            eventKey={item.C_Id}
                                                            as={Link}
                                                            to={"/Productcategory/" + item.C_Id}>
                                                            <MDBIcon far icon="list-alt" />
                                                            {item.C_Name}
                                                        </NavLink>
                                                    </p>

                                                )
                                            }) :
                                                <Col sm={12} md={12} lg={12} xl={12} className='d-flex flex-row justify-content-center h-100  align-items-center text-center'>
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                </Col>
                                            }

                                        </Col>
                                    </Row>
                                </Col>
                            </Col>
                            <Col className="mb-5  mt-5" sm={6} md={6} lg={6} xl={6}>
                                {/* <Slider /> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <div className=" d-flex flex-row overflow-x-scroll">
                    {cartSlide != null ?
                        cartSlide.map((item, index) => {
                            return (
                                <Col key={index} style={{ "height": "400px" }} className="p-1" sm={6} md={6} lg={4} xl={3} >
                                    <MDBCard className="w-100 h-100 p-1 bg-light shadow-1-strong">
                                        <MDBRipple rippleColor='light' rippleTag='div' className=' bg-image hover-zoom'>
                                            <MDBCardImage
                                                src={`http://localhost/Images/${item.Images}`}
                                                className=" object-fit:cover w-100"
                                                style={{ "height": "200px" }}
                                                alt='...' />

                                        </MDBRipple>
                                        <MDBCardBody>
                                            <MDBCardTitle>{item.P_Name}</MDBCardTitle>
                                            <MDBCardText className="h-50">
                                                <span className="text-danger m-0 p-0">{item.P_Price} $ </span>
                                                {item.P_Description.substr(0, 50) + "..."}
                                            </MDBCardText>
                                            <MDBBtn href='#'>view detail</MDBBtn>
                                        </MDBCardBody>

                                    </MDBCard>
                                </Col>
                            )
                        })
                        :
                        <Col sm={12} md={12} lg={12} xl={12} className='d-flex flex-row justify-content-center h-100  align-items-center text-center'>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    }
                </div>
                <Row>
                    <Col xl={12} xs={12} sm={12} md={12} lg={12} className='bg-light text-center text-lg-start text-muted'  >
                        <MDBContainer fluid>
                            {randomCartClient != null ?
                                randomCartClient.map((item, index) => {
                                    return (
                                        <MDBRow key={index} className="justify-content-center mb-0">
                                            <MDBCol md="12" xl="10">
                                                <MDBCard className="shadow-0 border rounded-3 mt-3 mb-1">
                                                    <MDBCardBody>
                                                        <MDBRow>
                                                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                                <MDBRipple
                                                                    rippleColor="light"
                                                                    rippleTag="div"
                                                                    className="bg-image rounded hover-zoom hover-overlay"
                                                                >
                                                                    <MDBCardImage
                                                                        src={`http://localhost/Images/${item.Images}`}
                                                                        className="object-fit:cover w-100"
                                                                        style={{ "height": "200px" }}
                                                                        alt='...'
                                                                    />
                                                                    <a href="#!">
                                                                        <div
                                                                            className="mask"
                                                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                                        ></div>
                                                                    </a>
                                                                </MDBRipple>
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <h5>{item.P_Name}</h5>
                                                                <div className="d-flex flex-row">
                                                                    <div className="text-danger mb-1 me-2">
                                                                        <MDBIcon fas icon="star" />
                                                                        <MDBIcon fas icon="star" />
                                                                        <MDBIcon fas icon="star" />
                                                                        <MDBIcon fas icon="star" />
                                                                    </div>
                                                                    {/* wisht list but take price demo first coz not yet buil wist list ready */}
                                                                    <span>{item.P_Price}veiw</span>
                                                                </div>
                                                                <p className="text-truncate mb-4 mb-md-0">
                                                                    <span className="fw-bold">Category:</span> {item.category}
                                                                </p>
                                                                <div className="mt-1 mb-0 text-muted small">
                                                                    <span>{item.P_Description.substr(0, 200) + "..."}</span>


                                                                </div>



                                                            </MDBCol>
                                                            <MDBCol
                                                                md="6"
                                                                lg="3"
                                                                className="border-sm-start-none border-start"
                                                            >
                                                                <div className="d-flex flex-row align-items-center mb-1">
                                                                    <h4 className="mb-1 me-1 text-danger">${item.P_Price}</h4>
                                                                </div>
                                                                <h6 className="text-success">Free shipping</h6>
                                                                <div className="d-flex flex-column mt-4">
                                                                    <MDBBtn color="primary" size="sm">
                                                                        Details
                                                                    </MDBBtn>
                                                                    <MDBBtn outline color="primary" size="sm" className="mt-2">
                                                                        Add to cart
                                                                    </MDBBtn>
                                                                </div>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    )
                                })
                                :
                                <Col sm={12} md={12} lg={12} xl={12} className='d-flex flex-row justify-content-center  align-items-center text-center'>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Col>
                            }

                        </MDBContainer>
                    </Col>
                </Row>
                <Row>
                    <Col className='bg-light text-center text-lg-start text-muted' xl={12} xs={12} sm={12} md={12} lg={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container >

        </>
    )
}

export default Home