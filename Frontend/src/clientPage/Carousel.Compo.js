import { useEffect, useState } from 'react';
import React from 'react';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import axios from 'axios'

const Slider = () => {
    const [slide, setSlide] = useState()

    useEffect(() => {
        getSlide()
    }, [])

    const getSlide = () => {
        axios({
            url: "http://localhost:8080/api/product/slide",
            method: "GET"
        }).then(res => {
            let data = res.data
            setSlide(data?.data)
        })
    }

    var i = 1
    function Slideindex(i, row) {
        if (i > row.length) {
            i = 1
        } else {
            i++
        }
        return i
    }

    return (
        <>
            {/* {slide != null &&
                <>
                    {slide.map((row, index) => {
                        return (
                            <MDBCarousel showControls fade className='bg-image hover-zoom'>
                                <MDBCarouselItem
                                    className=" object-fit: cover d-block w-100"
                                    itemId={index}
                                    src={`http://localhost/Images/${row.Images}`}
                                    alt="..."
                                >
                                    <h5>{row.P_Name}</h5>
                                </MDBCarouselItem>
                            </MDBCarousel>
                        )
                    })

                    }
                </>} */}
        </>
    );
}

export default Slider