import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function Detail() {
    const [data, setData] = useState()
    const params = useParams()
    const profile = JSON.parse(localStorage.getItem("profile"))

    useEffect(() => {
        getOne_Detail()
    }, [params.id])


    const getOne_Detail = () => {
        axios({
            url: "http://localhost:8080/api/product/detail/" + params.id,
            method: "GET",
        }).then(res => {
            if (res.data.error === true) {
                alert(res.data.message)
            } else {
                setData(res.data.data)
            }
        })
    }

    const getdata = (Item) => {
        axios({
            url: "http://localhost:8080/api/cart/create",
            data: {
                User_Id: profile.User_Id,
                Product_Id: Item.P_Id,
                Qty: 1
            },
            method: "POST",

        }).then(res => {
            if (res.data.error === true) {
                alert(res.data.message)
            } else {
                alert(res.data.message)

            }
        })
    }

    return (
        <MDBContainer fluid className="my-5" >
            {data?.map((item, index) => {
                return (
                    <MDBRow key={index} className="justify-content-center">
                        <MDBCol md="8" lg="6" xl="4">
                            <MDBCard style={{ borderRadius: "15px" }}>
                                <MDBRipple
                                    rippleColor="light"
                                    rippleTag="div"
                                    className="bg-image rounded hover-overlay"
                                >
                                    <MDBCardImage
                                        src={`http://localhost/Images/${item.Images}`}
                                        fluid
                                        className="w-100"
                                        style={{
                                            borderTopLeftRadius: "15px",
                                            borderTopRightRadius: "15px",
                                        }}
                                    />
                                    <a href="#!">
                                        <div className="mask"></div>
                                    </a>
                                </MDBRipple>
                                <MDBCardBody className="pb-0">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p>
                                                <a href="#!" className="text-dark">
                                                    {item.P_Name}
                                                </a>
                                            </p>
                                            <p className="small text-muted">{item.C_Name}</p>
                                        </div>
                                        <div>
                                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                            </div>

                                        </div>
                                    </div>
                                </MDBCardBody>
                                <hr class="my-0" />
                                <MDBCardBody className="pb-0">
                                    <div className="d-flex justify-content-between">
                                        <p>
                                            <a href="#!" className="text-dark">
                                                ${item.P_Price}
                                            </a>
                                        </p>

                                    </div>
                                    <p className="small text-muted">{item.P_Description}</p>
                                </MDBCardBody>
                                <hr class="my-0" />
                                <MDBCardBody className="pb-0">
                                    <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                                        <Link to={'/'} className="text-dark fw-bold">
                                            Cancel
                                        </Link>

                                        <MDBBtn
                                            outline color="primary"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => {
                                                getdata(item)
                                            }}>
                                            Add to cart
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                )
            })}

        </MDBContainer>
    );
}

export default Detail;