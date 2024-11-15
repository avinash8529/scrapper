"use client"
import React, { useState } from 'react'

const UserInput = () => {

    const [data, setData] = useState("");
    const [result, setResult] = useState(null);

    const inputData = (evt) => {
        setData(evt.target.value);
    }

    // take input textbox data (there is a direct way also tto take the data )
    const handleData = (evt) => {
        evt.preventDefault();
        setResult(data);
        console.log(data);
    }

    return (
        <div className="container-fluid">
            <div className="col-12 col-sm-12 border border-danger p-3 d-flex justify-content-center">
                <form className='col-sm-5' onSubmit={handleData}>
                    <div className="border border-success rounded p-2">
                        <h5 htmlFor="serach"><b>Enter MagicBricks URL:</b></h5>
                        <input className='form-control mt-2' type="text" onChange={inputData} placeholder='enter the magicBricks URL' required />
                        <button className='btn btn-primary mt-2 ms-1' type='submit'>Find</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserInput
