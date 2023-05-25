import './profile.css'
import { Col, Spinner } from 'react-bootstrap'
import Icon from '../Component/Icon.compo'
import {
    useNavigate
} from "react-router-dom"
import { useEffect } from 'react'
import axios from 'axios'


const Profile = () => {
    const navigate = useNavigate()
    const profile = JSON.parse(localStorage.getItem("profile"))
    const loging = localStorage.getItem("login")
    useEffect(() => {
        if (!loging) {
            navigate("/")
        }
    }, [])

    const logout = () => {
        axios({
            url: "http://localhost:8080/api/userTime",
            data: { User_Id: profile.User_Id },
            method: "PUT"
        }).then(res => {
            var data = res.data
            if (data.error === true) {
                console.log(res.data.message)
            } else {
                localStorage.removeItem("login")
                window.location.href = '/'
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
        <>

            {!profile ?
                <Col className='d-flex flex-row justify-content-center  align-items-center h-100 text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
                :
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-8 col-md-12">
                                <div className="card user-card-full">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-4 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png"
                                                        className="img-radius"
                                                        alt="User-Profile-Image" />
                                                </div>
                                                <h6 className="f-w-600">{profile.User_Name}</h6>
                                                <p>Software developer</p>
                                                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-8">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{profile.Email}</h6>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                        <h6 className="text-muted f-w-400">{profile.Tel}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Tools</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <button
                                                            className='btn btn-outline-danger text-dark'
                                                            style={{ button: "0px" }}
                                                            onClick={logout}
                                                        >
                                                            <Icon choose='logout' /> Logout
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
export default Profile