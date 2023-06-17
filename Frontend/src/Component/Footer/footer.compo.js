import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
const profile = JSON.parse(localStorage.getItem("profile"))


export default function Footer() {
    return (
        <>
            <MDBFooter bgColor='light'>
                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5 mb-0'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="gem" className="me-3" />
                                    Computer shop
                                </h6>
                                <p>
                                    Our shop has good products. computer shops offer valuable repair services to help solve any hardware or software issues your computer might have.
                                </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        <MDBIcon fas icon="laptop-code" />    Laptop
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        <MDBIcon fas icon="desktop" />   Desktop
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        <MDBIcon fab icon="android" />   Andriod
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        <MDBIcon fab icon="apple" /> Ios
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Your Addres</h6>
                                <p>
                                    <MDBIcon icon="home" className="me-2" />
                                    Not yet define it
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    {profile.Email}
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" /> {profile.Tel}
                                </p>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2021 Copyright:
                    <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                        MDBootstrap.com
                    </a>
                </div>
            </MDBFooter>
        </>
    );
}