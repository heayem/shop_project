import {
    Col,
    Container,
    Row
} from "react-bootstrap"
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../util/api";


const CartShop = () => {
    const param = useParams()
    const [message, setMessage] = useState()
    const [cart, setCart] = useState()
    const [Total, setTotal] = useState()
    const [ItemTotal, setItemTotal] = useState()
    const [Qty, setQty] = useState(2)

    useEffect(() => {
        getCart()

    }, [])

    const getCart = () => {
        const url = "cart/getByUser/" + 1
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
                setCart(data.data)
                setTotal(data.total)
                setItemTotal(data.RecordNum)

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
        <Container fluid>
            <Row >
                <Col className="bg-white h-100" sm={12} md={12} lg={12} xl={12} >
                    <section className="h-100 gradient-custom">
                        <MDBContainer className="py-5 h-100">
                            <MDBRow className="justify-content-center my-4">
                                <MDBCol md="8">

                                    <MDBCard className="mb-4">
                                        <MDBCardHeader className="py-3">
                                            <MDBTypography tag="h5" className="mb-0">
                                                Cart - {ItemTotal} items
                                            </MDBTypography>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            {cart != null ?
                                                cart?.map((item, index) => {
                                                    return (
                                                        <>
                                                            {/* not yet join data for rander to client  */}
                                                            <MDBRow key={index}>
                                                                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                                    <MDBRipple rippleTag="div" rippleColor="light"
                                                                        className="bg-image rounded hover-zoom hover-overlay">
                                                                        <img
                                                                            src={`http://localhost/Images/${item.Images}`}
                                                                            className="w-100" />

                                                                    </MDBRipple>
                                                                </MDBCol>

                                                                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                                    <p>
                                                                        <strong>{item.P_Name}</strong>
                                                                    </p>
                                                                    <p>{item.C_Name}</p>


                                                                    <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                                                                        title="Remove item">
                                                                        <MDBIcon fas icon="trash" />
                                                                    </MDBTooltip>

                                                                    <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-2"
                                                                        title="Move to the wish list">
                                                                        <MDBIcon fas icon="heart" />
                                                                    </MDBTooltip>
                                                                </MDBCol>

                                                                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                                        <MDBBtn className="px-3 me-2" onClick={() => Qty > 1 ? setQty(Qty - 1) : null}>
                                                                            <MDBIcon fas icon="minus" />
                                                                        </MDBBtn>

                                                                        <MDBInput value={Qty} min={1} readOnly type="number" label="Quantity" />
                                                                        <MDBBtn className="px-3 ms-2" onClick={() => setQty(Qty + 1)}>
                                                                            <MDBIcon fas icon="plus" />
                                                                        </MDBBtn>
                                                                    </div>

                                                                    <p className="text-start text-md-center">
                                                                        <strong>${(item.P_Price * item.Quantity)}</strong>
                                                                    </p>
                                                                </MDBCol>

                                                            </MDBRow>
                                                            <hr className="my-4" />
                                                        </>
                                                    )

                                                })
                                                :
                                                <>
                                                </>
                                            }

                                        </MDBCardBody>
                                    </MDBCard>




                                    {/* no product place */}
                                    <MDBCard className="mb-4">
                                        <MDBCardBody>
                                            <p>
                                                <strong>Expected shipping delivery</strong>
                                            </p>
                                            <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBCard className="mb-4 mb-lg-0">
                                        <MDBCardBody>
                                            <p>
                                                <strong>We accept</strong>
                                            </p>
                                            <MDBCardImage className="me-2" width="45px"
                                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                                alt="Visa" />
                                            <MDBCardImage className="me-2" width="45px"
                                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                                alt="American Express" />
                                            <MDBCardImage className="me-2" width="45px"
                                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                                alt="Mastercard" />
                                            <MDBCardImage className="me-2" width="45px"
                                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                                alt="PayPal acceptance mark" />
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4">
                                    <MDBCard className="mb-4">
                                        <MDBCardHeader>
                                            <MDBTypography tag="h5" className="mb-0">
                                                Summary
                                            </MDBTypography>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <MDBListGroup flush>
                                                <MDBListGroupItem
                                                    className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    Products
                                                    <span>${Total}</span>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                                    Shipping
                                                    <span>Gratis</span>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem
                                                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>Total amount</strong>
                                                        <strong>
                                                            <p className="mb-0">(including VAT)</p>
                                                        </strong>
                                                    </div>
                                                    <span>
                                                        <strong>${Total}</strong>
                                                    </span>
                                                </MDBListGroupItem>
                                            </MDBListGroup>

                                            <MDBBtn block size="lg" onClick={() => alert("Ready do it just call api to use and don't forget user_id is importan")}>
                                                Go to checkout
                                            </MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}

export default CartShop