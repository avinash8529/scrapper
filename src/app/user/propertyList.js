import React from 'react'

const PropertyList = () => {
    return (
        <div className="container-fluid">
            <div className="container">
                <h3>
                    Popular Owner Properties
                </h3>

                <div className="d-flex overflow-auto" >
                    <div className='col-sm-3 m-1 p-1 border rounded border-danger' style={{ minHeight: "350px" }}>
                        <div className="data-card rounded" >
                            <img className='img-fluid rounded' src="https://images.unsplash.com/photo-1443428018053-13da55589fed?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Property Image" />
                            <div className="col-sm-12 p-2 ">
                                <div className="col-sm-12">2 BHK</div>
                                <div className="col-sm-12"><b>&#8377; 24 Lac | 960 sqft.</b></div>
                                <div className="col-sm-12 mt-1">Ashok Vihar,Delhi</div>
                                <button className='btn btn-danger'>View Details</button>
                            </div>
                        </div>

                    </div>

                    <div className='col-sm-3 m-1 p-1 border rounded border-danger' style={{ minHeight: "350px" }}>
                        <div className="data-card rounded" >
                            <img className='img-fluid rounded' src="https://images.unsplash.com/photo-1443428018053-13da55589fed?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Property Image" />
                            <div className="col-sm-12 p-2 ">
                                <div className="col-sm-12">2 BHK</div>
                                <div className="col-sm-12"><b>&#8377; 24 Lac | 960 sqft.</b></div>
                                <div className="col-sm-12 mt-1">Ashok Vihar,Delhi</div>
                                <button className='btn btn-danger'>View Details</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyList
