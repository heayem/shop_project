import { NavLink } from "react-bootstrap";
import {
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse,
    MDBNavbarNav,
    MDBIcon,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBContainer,
    MDBNavbar,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from '../clientPage/logo/logo.png'
import axios from "axios";


const Navclient = () => {
    const [showBasic, setShowBasic] = useState(false);
    const [category, setCatgory] = useState([])

    useEffect(() => {
        getList()
    }, [])
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


    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand >
                    <NavLink eventKey="1" as={Link} to={"/"}>
                        <img src={logo} style={{ "width": "50px", "height": "50px" }} alt='...' />
                    </NavLink>
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto fs-5  mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink >
                                <NavLink eventKey="1" className="text-success" as={Link} to={"/"}>
                                    <MDBIcon fas icon="house-damage" />
                                </NavLink>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link fw-bold text-success' role='button'>
                                        Menu
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {category.map((item, index) => {
                                            return (
                                                <MDBDropdownItem as={Link} key={index} link>
                                                    <NavLink className="text-success" eventKey={item.C_Id} as={Link} to={"/Productcategory/" + item.C_Id}> <MDBIcon far icon="list-alt" /> {item.C_Name} </NavLink>
                                                </MDBDropdownItem>
                                            )
                                        })}

                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <NavLink eventKey="2" className="text-success" as={Link} to={"/CartShop"}>
                                    <MDBIcon fas icon="shopping-cart" />
                                </NavLink>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                    </MDBNavbarNav>


                    <MDBBtn color='primary'>
                        <NavLink eventKey="3" as={Link} to={"/Profile"}>  Profile</NavLink>
                    </MDBBtn>

                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>

    )
}

export default Navclient;