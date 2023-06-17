import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import axios from "axios"



const Grap = () => {
    const [Year, setYear] = useState(
        [
            {
                name: "",
                Average: 0
            }
        ])
    const [Day, setDay] = useState(
        [
            {
                date: "",
                total: 0
            }
        ])
    const [month, setMonth] = useState(
        [
            {
                date: "",
                total: 0
            }
        ])

    useEffect(() => {
        getThisYear()
        getToday()
        getThisMonth()
    }, [])

    function getThisMonth() {
        axios({
            url: "http://localhost:8080/api/thismonth",
            method: "GET",
        }).then(res => {
            if (res.data.err === true) {
                console.log(res.data.message)
            } else {
                setMonth(res.data.data)
                console.log(month)
            }
        })
    }


    function getToday() {
        axios({
            url: "http://localhost:8080/api/today",
            method: "GET",
        }).then(res => {
            if (res.data.err === true) {
                console.log(res.data.message)
            } else {
                setDay(res.data.data)
                console.log(Day)
            }
        })
    }

    function getThisYear() {
        axios({
            url: "http://localhost:8080/api/thisyear",
            method: "GET",
        }).then(res => {
            if (res.data.err === true) {

                console.log(res.data.message)

            } else {
                setYear(res.data.data)
            }
        })
    }


    return (
        // <div className='container fluid bg-dark w-100'>
        <div className='row'>
            <div className='col-sm-12 col-xl-12'>
                <div className='row'>
                    < div className='col-sm-5 col-xl-5 shadow-sm p-3 mb-5 bg-white rounded'>
                        <h3>Total sales today </h3>
                        <h6>Date: {Day[0].date !== null ? Day[0].date : null}</h6>
                        <h4 className='text-success'>Total: {Day[0].total !== null ? Day[0].total : null}$</h4>
                    </div>
                    < div className='col-sm-2 col-xl-2'></div>
                    < div className='col-sm-5 col-xl-5 shadow-sm p-3 mb-5 bg-white rounded'>
                        <h3>Total sales per month </h3>
                        <h6>Date: {month[0].date !== null ? month[0].date : null}</h6>
                        <h4 className='text-success'>Total: {month[0].total !== null ? month[0].total : null}$</h4>
                    </div>
                </div>
            </div>
            <div className='col-sm-12 col-xl-12 shadow-lg p-3 mb-5 bg-white rounded'>
                <h3 className='text-danger'>Chart per year</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                        width={"100%"}
                        height={200}
                        data={Year}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Average" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* <div className='col-12'>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                        width={"100%"}
                        height={200}
                        data={data}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                        <Brush />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <h1> Amount </h1>
            <div className='col-12'>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                        width={500}
                        height={200}
                        data={data}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="amt" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </ResponsiveContainer>
            </div> */}
        </div>
        // </div>
    );
}

export default Grap
