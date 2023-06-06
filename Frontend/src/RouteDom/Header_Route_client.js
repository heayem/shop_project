import { Nav, NavLink, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from '../Component/Icon.compo'

const Navclient = () => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as={Link} to={"/"}>Home</NavLink>
                    <NavLink eventKey="2" as={Link} to={"/"}>About</NavLink>
                    <NavLink eventKey="3" as={Link} to={"/"}>Contact</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Navclient;