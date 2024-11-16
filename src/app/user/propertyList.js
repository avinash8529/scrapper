"use client";//enbles client component by default next teat as server component
import React, { useEffect, useState } from 'react';//states
import axios from 'axios';

const PropertyList = () => {
    const [data, setData] = useState([]);// to stoore the data from api

    useEffect(() => {
        getAllData();//to initialise fecthing when page loads
    }, [])

    const getAllData = async () => {// function to fetch data from api
        try {
            debugger
            var result = await axios.get("http://localhost:3000/api/property");//api 
            setData(result.data.result.reverse());// set data tor display list 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid">
            <div className="container">
                <h3>Popular Owner Properties</h3>

                {/* Flex container with horizontal scroll */}
                <div className="d-flex overflow-auto" style={{ overflowX: 'auto' }}>

                    {data.map((item, index) => {
                        return (
                            <div key={index} className="col-sm-3 m-1 p-1 border rounded border-danger" style={{ minHeight: "350px", flex: "0 0 auto" }}>
                                <div className="data-card rounded">
                                    <div className="col-sm-12 border">
                                        <img className='rounded' src={item.picture} width="310px" height="200px" alt={item.title || "Property Image"} />
                                    </div>
                                    <div className="col-sm-12 p-2">
                                        <div className="col-sm-12">{item.title}</div>
                                        <div className="col-sm-12"><b>{item.price || "Price not available"}</b></div>
                                        <div className="col-sm-12 mt-1">{item.location || "Location not specified"}</div>
                                        <button
                                            onClick={() =>
                                                alert(`${item.title}\nPrice: ${item.price}\nThanks for visiting`)
                                            }
                                            className="btn btn1 btn-danger"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>

    )
}

export default PropertyList
