"use client"
import React, { useState } from 'react'
import axios from 'axios';//for http requests
import Image from 'next/image';

const UserInput = () => {

    const [data, setData] = useState("");//store data from input textbox
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);//showing progress of task
    const [error, setError] = useState(false);//triggering potential error

    const inputData = (evt) => {
        setData(evt.target.value);
    }

    // take input textbox data (there is a direct way also tto take the data )
    const handleData = async (evt) => {
        evt.preventDefault();
        setLoading(true); // Start loading state

        try {
            const payload = { url: data };
            debugger // Construct payload
            // Send POST request
            const response = await axios.post("http://localhost:3000/api/property", payload);
            // Update result if the response is valid
            if (response.data) {
                setResult(response.data.data); // Set the result state
                console.log(response.data.data);
            }
        } catch (error) {
            setError(true);
            console.log("Error occurred:", error); // Log error
        } finally {
            setLoading(false); // End loading state, always runs
        }
    };


    return (
        <div className="container-fluid">
            <div className="col-12 col-sm-12 border border-danger p-3 d-flex justify-content-center">
                {(result === null && error === false) ? <form className='col-sm-5' onSubmit={handleData}>
                    <div className="border border-success rounded p-2">
                        <h5 htmlFor="serach"><b>Enter MagicBricks URL:</b></h5>
                        <input className='form-control mt-2' type="text" onChange={inputData} placeholder='enter the magicBricks URL' required />
                        {!loading ? <button className='btn btn-primary mt-2 ms-1' type='submit'>Find</button> :
                            <>
                                Search In Progress...
                                <Image src="/images/Preloader_11.gif" className='mt-2 ms-3' alt="" width={50} height={50} />
                            </>
                        }
                    </div>
                </form> :
                    <>
                        {(error === true && result !== null) ? <div className='col-sm-3'><h5 className='text-danger'>Failed...!</h5>
                            <button onClick={() => setError(false)} className='btn btn-warning'>Back</button>
                        </div> :
                            <div className='col-sm-3 m-1 p-1 border rounded border-danger' style={{ minHeight: "330px" }}>
                                <div className="data-card rounded" >
                                    <div className="col-sm-12 text-success"><h5 className='text-success'>Data saved successfully..</h5></div>
                                    <img className='rounded text-center' src={result.picture} width="310px" height="200px" alt={result.title || "Property Image"} />
                                    <div className="col-sm-12 p-2 ">
                                        <div className="col-sm-12">{result.title}</div>
                                        <div className="col-sm-12"><b>{result.price}.</b></div>
                                        <div className="col-sm-12 mt-1">{result.location}</div>
                                        {/* <button className='btn btn-danger m-1'>View Details</button> */}
                                        <button onClick={() => setResult(null)} className='btn btn-info'>Back</button>
                                    </div>
                                </div>
                            </div>}
                    </>
                }
            </div>
        </div >
    )
}

export default UserInput
