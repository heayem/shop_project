import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Monday',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Tursday',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Wednesday',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Thursday',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Friday',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Saturday',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Sunday',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Grap = () => {
    return (

        // <div className='container fluid bg-dark w-100'>
        <div className='row'>
            <div className='col-12'>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                        width={"100%"}
                        height={400}
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
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='col-12'>
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
            </div>
        </div>
        // </div>
    );
}

export default Grap
