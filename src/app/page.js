"use client"
import { useState } from "react";
import PropertyList from "./user/propertyList";
import UserInput from "./user/userInput";

export default function Home() {
  const [list, setList] = useState(false)
  return (
    <main className="container-fluid d-flex justify-content-center flex-column">
      <h1 className="text-center mt-3">Scrapper Application</h1>
      <div className="col-sm-12 d-flex justify-content-center m-2">
        <button onClick={() => setList(!list)} className="btn btn-primary col-sm-2">{!list ? "Propert List" : "Serach property"}</button>
      </div>
      {!list ? <UserInput /> :
        <PropertyList />}
    </main>

  );
}
