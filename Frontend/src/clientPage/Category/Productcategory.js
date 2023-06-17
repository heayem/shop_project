import {
    Container,
    Row,
    Col,
    Spinner
} from "react-bootstrap"
import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBRipple,
    MDBBtn,
} from 'mdb-react-ui-kit';
import axios from "axios";
import Footer from "../../Component/Footer/footer.compo";

import { useParams } from 'react-router-dom';

const Productcategory = () => {
    const [category, setCatgory] = useState([])
    const [products, setProduct] = useState()
    const params = useParams();
    useEffect(() => {
        getList()
        getProduct()
    }, [params.id])

    const getList = () => {
        const urls = "http://localhost:8080/api/category"
        axios({
            url: urls,
            data: {},
            method: "GET"
        }).then(res => {
            let data = res?.data
            setCatgory(data.list)
            console.log(category)
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                console.log(err.message)

            }
        })
    }
    const getProduct = () => {
        const urls = "http://localhost:8080/api/product/one/" + params.id
        axios({
            url: urls,
            data: {},
            method: "GET"
        }).then(res => {
            let data = res.data
            setProduct(data?.data)
            console.log(products[0].P_Name)
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                console.log(err.message)

            }
        })
    }




    return (
        <Container fluid>
            <Row>

                {products != null ? (
                    products.map((item, index) => {
                        if (item === null) {
                            return (
                                <Col style={{ "height": "500px" }} sm={12} md={12} lg={12} xl={12} className='d-flex flex-row justify-content-center  align-items-center text-center'>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Col>
                            )
                        } else {
                            return (
                                <Col className="mg-5 p-5" style={{ "height": "600px" }} sm={6} md={6} lg={6} xl={6}>
                                    <MDBCard key={index} className="w-100 h-100 p-1 bg-light shadow-1-strong">
                                        <MDBRipple rippleColor='light' rippleTag='div' className=' bg-image hover-zoom'>
                                            <MDBCardImage
                                                src={`http://localhost/Images/${item.Images}`}
                                                className=" object-fit:cover w-100"
                                                style={{ "height": "300px" }}
                                                alt='...' />
                                        </MDBRipple>
                                        <MDBCardBody>
                                            <MDBCardTitle>Product name</MDBCardTitle>
                                            <MDBCardText className="h-50">
                                                <span className="text-danger m-0 p-0">{item.P_Name} $ </span>
                                                {item.P_Description.substr(0, 150) + "..."}
                                            </MDBCardText>
                                            <MDBBtn href='#'>view detail</MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </Col>
                            );
                        }
                    })
                )
                    :
                    <Col style={{ "height": "500px" }} sm={12} md={12} lg={12} xl={12} className='d-flex flex-row justify-content-center  align-items-center text-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                }

            </Row>
            <Row>
                <Col className="bg-white  mg-5 h-100 p-5" sm={12} md={12} lg={12} xl={12}>
                    < Footer />
                </Col>
            </Row>
        </Container>
    )
}

export default Productcategory